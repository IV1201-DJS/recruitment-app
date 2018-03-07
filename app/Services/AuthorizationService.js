'use strict'
const db = use('Database')

/** 
 * Service for authorizing a user
 * 
 * @class AuthorizationService
*/
class AuthorizationService {
  /**
   * Checks if the current user
   * is authorized based on role
   * 
   * @param {Auth} auth 
   * @param {Array} role_names 
   */
  static async byRoles(auth, role_names) {
    let user, role
    try {
      user = await auth.getUser()
      const trx = await db.beginTransaction()
      role = await user.role()
        .transacting(trx)
        .forShare()
        .fetch()
      await trx.commit()
    } catch (authError) {
      throw new Error('Could not authenticate user')
    }
    const authorized = role.name === 'ADMIN' || role_names.includes(role.name)
    if (!authorized) {
      throw new Error('User not authorized') //TODO: Implement exceptions
    }
  }
}

module.exports = AuthorizationService
