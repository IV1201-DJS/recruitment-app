'use strict'

const { validate } = use('Validator')
const User = use('App/Models/User')
const LegacyUser = use('App/Models/LegacyUser')
const UserMigrator = use('App/Services/UserMigrator')
const LegacyDatabse = use('App/Services/LegacyDatabaseHandler')

class UserController {
  constructor () {
    this.migrator = new UserMigrator()
    this.legacyDB = new LegacyDatabse()
  }

  async store ({ request }) {
    const rules = {
      username: 'required|unique:users,username',
      password: 'required',
      email: 'required|email|unique:users,email',
      firstname: 'required',
      lastname: 'required',
      ssn: 'required|unique:users,ssn' 
    }

    const userData = request.only(['username', 'password', 'email', 'firstname', 'lastname', 'ssn'])

    const validation = await validate(userData, rules)

    if (validation.fails()) {
      return validation.messages()
    }

    return await User.create(userData)
  }

  async login ({ request, response, auth }) {
    const {
      username,
      password
    } = request.only(['username', 'password'])
    
    try {
      let { token } = await auth.attempt(username, password)
      return { token } // user is already transfered
    } catch (noUser) {
      const legacyUserData = await this.legacyDB.getUserByLogin(username, password)
      if (!legacyUserData) {
        return response.status(401).json({
          message: 'Unauthorized' // TODO: Leif it up
        })
      }
      const isComplete = await this.migrator.isCompleteUser(legacyUserData)
      if (!isComplete) {
        const oldUser = new LegacyUser()
        oldUser.newUp(legacyUserData)
        return oldUser
      }
      await this.migrator.migrate(legacyUserData)
      let { token } = await auth.attempt(username, password)
      return { token }
    }
  }

  async transfer ({ request, response }) {
    const hello = await this.legacyDB.getUserByLogin('borsg','wl9nk23a')
    console.log(hello)
    return response.send(hello)
  }

}

module.exports = UserController
