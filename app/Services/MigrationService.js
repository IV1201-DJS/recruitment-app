'use strict'

const { validateAll } = use('Validator')
const User = use('App/Models/User')
const Availability = use('App/Models/Availability')
const LegacyUser = use('App/Models/LegacyUser')
const LegacyDatabaseHandler = use('App/Services/LegacyDatabaseHandler')
const IncompleteProfileException = use('App/Exceptions/REST/IncompleteProfileException')
const Hash = use('Hash')
const moment = require('moment')

/**
 * Service for migrating old users to the new database
 *
 * @class MigrationService
 */
class MigrationService {
  /**
   * Creates an instance of MigrationService.
   * @memberof MigrationService
   */
  constructor (legacyDB = new LegacyDatabaseHandler(), newDB = use('Database')) {
    this.legacyDB = legacyDB
    this.newDB = newDB
    this.hash = Hash.make
  }

  async findLegacyData(username, password) {
    return await this.legacyDB.getUserByLogin(username, password)
  }

  /**
   * Attempts to migrate a user.
   *
   * @param {Object} legacyUserData
   * @memberof UserController
   * @private
   */
  async attemptMigration (newData, oldData) {
    const missingData = await this._isMissingData(newData)
    if (missingData) {
      throw new IncompleteProfileException(missingData)
    }
    return await this._migrate(newData, oldData)
  }

  /**
   * Determines if a legacy user has a complete profile
   *
   * @param {Object} newData
   * @returns {boolean}
   * @memberof MigrationService
   */
  async _isMissingData(data) {
    const validation = await validateAll(data, {
      name: 'required',
      surname: 'required',
      ssn: 'required',
      email: 'required|email',
      username: 'required',
      password: 'required'
    })

    return validation.fails()
      ? validation.messages()
      : false
  }

  /**
   * Migrates a complete user, with competences
   * and availabilities to the new database
   *
   * @param {Object} newData {name, surname, ssn, email, password, role_id, username}
   * @memberof MigrationService
   */
  async _migrate (newData, oldData) {
    const trx = await this.newDB.beginTransaction()
    const user = await this._migrateUser(trx, newData, oldData)
    await this._migrateCompetences(trx, user, oldData)
    await this._migrateAvailabilities(trx, user, oldData)
    await trx.commit()
    return user
  }

  /**
   * Migrates a complete user to the new database
   *
   * @param {Transaction} trx
   * @param {Object} newData {name, surname, ssn, email, password, role_id, username}
   * @returns {User}
   * @memberof MigrationService
   */
  async _migrateUser (trx, newData, oldData) {
    const userMapping = await this._getUserMapping(newData, oldData, new Date())
    userMapping.password = await this.hash(userMapping.password)
    const [ id ] = await trx.insert(userMapping).into('users').returning('id')
    return await User
      .query()
      .setHidden(['password', 'updated_at', 'deleted_at'])
      .transacting(trx)
      .where({ id })
      .first()
  }

  async _getUserMapping (newData, oldData, date) {
    const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss"
    return {
      firstname: newData.name,
      lastname: newData.surname,
      ssn: newData.ssn,
      email: newData.email,
      role_id: oldData.role_id || 1,
      username: newData.username,
      password: newData.password,
      created_at: moment(date).format(DATE_FORMAT),
      updated_at: moment(date).format(DATE_FORMAT)
    }
  }

  /**
   * Migrates the availabilites of a legacy user to the new database
   *
   * @param {Transaction} trx
   * @param {User} user
   * @param {Object} oldData { person_id }
   * @memberof MigrationService
   */
  async _migrateAvailabilities (trx, user, oldData) {
    const availabilities = await this.legacyDB.getAvailabilities(oldData.person_id)
    for (let a of availabilities) {
      const availabilityMapping = {
        user_id: user.id,
        from: a.from_date.toLocaleString('sv-SE'),
        to: a.to_date.toLocaleString('sv-SE')
      }
      await trx.insert(availabilityMapping).into('availabilities')
    }
  }

  /**
   * Migrates the competences of a legacy user to the new database
   *
   * @param {Transaction} trx
   * @param {User} user
   * @param {Object} oldData
   * @memberof MigrationService
   */
  async _migrateCompetences (trx, user, oldData) {
    const competenceProfiles = await this.legacyDB.getCompetenceProfiles(oldData.person_id)
    for (let p of competenceProfiles) {
      const pivotMapping = {
        user_id: user.id,
        competence_id: p.competence_id,
        experience_years: p.years_of_experience
      }
      await trx.insert(pivotMapping).into('competence_user')
    }
  }
}

module.exports = MigrationService
