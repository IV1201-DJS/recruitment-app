'use strict'
const db = use('Database')

class AuthorizationService {
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
    const authorized = role_names.includes(role.name)
    if (!authorized) {
      throw new Error('User not authorized') //TODO: Implement exceptions
    }
  }
}

module.exports = AuthorizationService
