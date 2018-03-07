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
}

module.exports = LegacyDatabaseHandler