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
  constructor (legacyDB = new LegacyDatabaseHandler(), newDB = use('Database')) {
    this.legacyDB = legacyDB
    this.newDB = newDB
    this.hash = Hash.make
  }

  /**
   * Retrieves potential legacy user data
   * 
   * @param {String} username 
   * @param {String} password
   * @returns {Object}
   */
  async findLegacyData(username, password) {
    return await this.legacyDB.getUserByLogin(username, password)
  }

  /**
   * Attempts to migrate an old user
   * 
   * @param {Object} newData 
   * @param {Object} oldData
   * @returns {User}
   */
  async attemptMigration (newData, oldData) {
    const missingData = await this._isMissingData(newData)
    if (missingData) {
      throw new IncompleteProfileException(missingData)
    }
    return await this._migrate(newData, oldData)
  }

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

  async _migrate (newData, oldData) {
    const trx = await this.newDB.beginTransaction()
    const user = await this._migrateUser(trx, newData, oldData)
    await this._migrateCompetences(trx, user, oldData)
    await this._migrateAvailabilities(trx, user, oldData)
    await trx.commit()
    return user
  }

  async _migrateUser (trx, newData, oldData) {
    const userMapping = await this._getUserMapping(newData, oldData, new Date())
    userMapping.password = await this.hash(userMapping.password)
    return await User.create(userMapping, trx)
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

  async _migrateAvailabilities (trx, user, oldData) {
    const availabilities = await this.legacyDB.getAvailabilities(oldData.person_id)
    const saves = availabilities.map(a => {
      const instance = new Availability()
      instance.from = a.from_date
      instance.to = a.to_date
      return user.availabilities().save(instance, trx)
    })
    await Promise.all(saves)
  }

  async _migrateCompetences (trx, user, oldData) {
    const competenceProfiles = await this.legacyDB.getCompetenceProfiles(oldData.person_id)
    const attachments = competenceProfiles.map(p => {
      return user.competences().attach(p.competence_id, row => {
        row.experience_years = p.years_of_experience
      }, trx)
    })
    await Promise.all(attachments)
  }
}

module.exports = MigrationService
