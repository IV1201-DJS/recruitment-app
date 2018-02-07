'use strict'

const Database = use('Database')

class LegacyDatabaseHandler {
  get db () {
    return Database.connection('legacy')
  }

  async getUserByLogin(username, password) {
    return await this.db.table('person').where({ username, password }).first()
  }

  async getCompetenceProfiles(person_id) {
    return await this.db.table('competence_profile').where({ person_id })
  }

  async getAvailabilities(person_id) {
    return await this.db.table('availability').where({ person_id })
  }
}

module.exports = LegacyDatabaseHandler