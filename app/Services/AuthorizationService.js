'use strict'
const db = use('Database')
const Env = use('Env')
const AppException = use('App/Exceptions/AppException')
const { USER_UNAUTHORIZED, AUTHENTICATION_FAILED } = use('App/Exceptions/Codes')
const ADMIN_HAS_GODMODE = Env.get('ADMIN_HAS_GODMODE', false)

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
      throw new AppException(AUTHENTICATION_FAILED)
    }
  
    const authorized = (ADMIN_HAS_GODMODE && (role.name === 'ADMIN')) || role_names.includes(role.name)
    if (!authorized) {
      console.log(role.name, 'is not', role_names)
      throw new AppException(USER_UNAUTHORIZED)
    }
  }
}

module.exports = AuthorizationService
