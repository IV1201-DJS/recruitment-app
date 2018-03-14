'use strict'

const ApplicationStatus = use('App/Models/ApplicationStatus')
const db = use('Database')
const authorize = use('App/Services/AuthorizationService')

/**
 * Repository for CRUD operations of Application Statuses
 * 
 * @class ApplicationStatusRepository
 */
class ApplicationStatusRepository {
  /**
   * Factory function that returns an instance if authorized
   * @param  {Auth}  auth            Adonis auth instance
   * @return {ApplicationStatusRepository}    
   */
  static async newInstance(auth, role_names = ['RECRUITER']) {
    await authorize.byRoles(auth, role_names)
    return new ApplicationStatusRepository()
  }

  /**
   * Retrieves all Application statuses
   * 
   * @return {[ApplicationStatus]}
   */
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

module.exports = ApplicationStatusRepository
