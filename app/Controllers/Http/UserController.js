'use strict'

const { validate } = use('Validator')
const User = use('App/Models/User')
const LegacyUser = use('App/Models/LegacyUser')
const UserMigrator = use('App/Services/UserMigrator')
const LegacyDatabse = use('App/Services/LegacyDatabaseHandler')
const LoginResponse = use('App/Data/REST/LoginResponse')

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
    
    // TODO: LEIFY IT UP
    userData.role_id = 1

    return await User.create(userData)
  }

  async login ({ request, response, auth }) {
    const { username, password } = request.only(['username', 'password'])

    try {
      const { token } = await auth.attempt(username, password)
      return new LoginResponse(response, 200, { token })
    } catch (noUser) {
      const legacyUserData = await this.legacyDB.getUserByLogin(username, password)
      if (!legacyUserData) {
        return new LoginResponse(response, 401, { message: 'The username or password was incorrect' })
      }
      try {
        await this.handleUserMigration(legacyUserData)
        const { token } = await auth.attempt(username, password)
        return new LoginResponse(response, 200, { token })
      } catch (legacyUser) {
        return new LoginResponse(response, 409, { legacyUser })
      }
    }
  }

  async transfer ({ request, response }) {
    const hello = await this.legacyDB.getUserByLogin('borsg','wl9nk23a')
    console.log(hello)
    return response.send(hello)
  }

  async handleUserMigration (legacyUserData) {
    const isComplete = await this.migrator.isCompleteUser(legacyUserData)
    if (!isComplete) {
      const legacyUser = new LegacyUser()
      legacyUser.newUp(legacyUserData)
      throw legacyUser.toJSON()
    }
    await this.migrator.migrate(legacyUserData)
  }
}

module.exports = UserController
