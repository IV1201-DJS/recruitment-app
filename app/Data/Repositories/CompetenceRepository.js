'use strict'

const db = use('Database')
const Competence = use('App/Models/Competence')
const authorize = use('App/Services/AuthorizationService')

class CompetenceService {
  static async newInstance(auth, role_names = ['RECRUITER']) {
    await authorize.byRoles(auth, role_names)
    return new CompetenceService()
  }

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

module.exports = CompetenceService
