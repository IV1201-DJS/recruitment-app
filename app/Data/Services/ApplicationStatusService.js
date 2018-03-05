'use strict'

const ApplicationStatus = use('App/Models/ApplicationStatus')
const db = use('Database')
const authorize = use('App/Services/AuthorizationService')

class ApplicationStatusService {
  static async newInstance(auth, role_names = ['RECURITER']) {
    await authorize.byRoles(auth, role_names)
    return new CompetenceService()
  }

  async fetchAll() {
    const trx = await db.beginTransaction()
    const statuses = await ApplicationStatus
      .query()
      .transacting(trx)
      .forShare()
      .fetch()
    await trx.commit()

    return statuses
  }
}

module.exports = ApplicationStatusService
