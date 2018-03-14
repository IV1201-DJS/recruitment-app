'use strict'

const User = use('App/Models/User')
const db = use('Database')
const authorize = use('App/Services/AuthorizationService')

/**
 * Repository for CRUD operations of Users
 * 
 * @class UserRepository
 */
class UserRepository {
  /**
   * Factory function that returns an instance if authorized
   * @param  {Auth}  auth            Adonis auth instance
   * @return {UserRepository}    
   */
  static async newInstance(auth, role_names = ['RECRUITER']) {
    await authorize.byRoles(auth, role_names)
    return new UserRepository()
  }

  /**
   * Retrieves a user by ID
   * 
   * @param {Int} id
   * @return {User}
   */
  async fetchById(id) {
    const trx = await db.beginTransaction()
    const user = await User
      .query()
      .transacting(trx)
      .forShare()
      .where({id})
      .first()
    await trx.commit()

    return user
  }
}

module.exports = UserRepository
