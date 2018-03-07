'use strict'

const User = use('App/Models/User')
const db = use('Database')
const authorize = use('App/Services/AuthorizationService')

class UserService {
  static async newInstance(auth, role_names = ['RECRUITER']) {
    await authorize.byRoles(auth, role_names)
    return new UserService()
  }

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

module.exports = UserService
