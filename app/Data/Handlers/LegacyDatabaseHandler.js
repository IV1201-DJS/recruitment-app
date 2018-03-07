'use strict'

const Database = use('Database')

/**
 * Handles communication with the legacy database
 * 
 * @class LegacyDatabaseHandler
 */
class LegacyDatabaseHandler {
  constructor () {
    this.db = Database.connection('legacy')
  }

  /**
   * Retrieves a legacy user if they exist
   * 
   * @param {String} username 
   * @param {String} password 
   * @returns {Object}
   * @memberof LegacyDatabaseHandler
   */
  async getUserByLogin(username, password) {
    return await this.db.table('person').where({ username, password }).first()
  }

  /**
   * Retrieves a legacy user's competence profiles if they exist
   * 
   * @param {Number} person_id 
   * @returns {Array}
   * @memberof LegacyDatabaseHandler
   */
  async getCompetenceProfiles(person_id) {
    return await this.db.from('competence_profile').where({ person_id })
  }

  /**
   * Retrieves a legacy user's availabilities if they exist
   * 
   * @param {Number} person_id 
   * @returns {Array}
   * @memberof LegacyDatabaseHandler
   */
  async getAvailabilities(person_id) {
    return await this.db.from('availability').where({ person_id })
  }

  async getUserByEmail(email) {
    return await this.db.table('person').where({ email }).first()
  }

  async getUserByUsername(username) {
    return await this.db.table('person').where({ username }).first()
  }

  async getUserBySSN(ssn) {
    return await this.db.table('person').where({ ssn }).first()
  }

  async replaceUserPassword(identifier, password) {
    await this.db.table('person').where(identifier).update({password})
  }
}

module.exports = LegacyDatabaseHandler