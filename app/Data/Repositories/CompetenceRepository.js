'use strict'

const db = use('Database')
const Competence = use('App/Models/Competence')
const authorize = use('App/Services/AuthorizationService')

/**
 * Repository for CRUD operations of Competences
 * 
 * @class CompetenceRepository
 */
class CompetenceRepository {
  /**
   * Factory function that returns an instance if authorized
   * @param  {Auth}  auth            Adonis auth instance
   * @return {CompetenceRepository}    
   */
  static async newInstance(auth, role_names = ['RECRUITER']) {
    await authorize.byRoles(auth, role_names)
    return new CompetenceRepository()
  }

  /**
   * Retrieves all competences with a similar name
   * 
   * @param {String} name 
   */
  async fetchWithSimilarName(name) {
    const trx = await db.beginTransaction()
    const competences = await Competence
      .query()
      .transacting(trx)
      .forShare()
      .where('name', 'ilike', `%${name}%`)
      .fetch()
    await trx.commit()

    return competences
  }

  /**
   * Retrieves all competences
   * 
   * @return {[Competence]}
   */
  async fetchAll() {
    const trx = await db.beginTransaction()
    const competences = await Competence
      .query()
      .transacting(trx)
      .forShare()
      .fetch()
    await trx.commit()

    return competences
  }
}

module.exports = CompetenceRepository
