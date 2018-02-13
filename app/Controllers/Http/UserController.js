'use strict'

const { validateAll } = use('Validator')
const User = use('App/Models/User')
const LegacyUser = use('App/Models/LegacyUser')
const UserMigrator = use('App/Services/UserMigrator')
const LegacyDatabase = use('App/Services/LegacyDatabaseHandler')
const LoginResponse = use('App/Data/REST/LoginResponse')


/**
 * Controller for creating and authenticating users
 * 
 * @class UserController
 */
class UserController {
  constructor () {
    this.legacyDB = new LegacyDatabase()
  }

  /**
   * Stores a user in the database
   * 
   * @param {Object} { request } 
   * @returns User
   * @memberof UserController
   */
  async store ({ request }) {
    const rules = {
      username: 'required|unique:users,username',
      password: 'required',
      email: 'required|email|unique:users,email',
      firstname: 'required',
      lastname: 'required',
      ssn: 'required|unique:users,ssn' 
    }

    const userData = request.only(Object.keys(rules))
    const validation = await validateAll(userData, rules)

    if (validation.fails()) {
      return validation.messages()
    }
    
    // TODO: LEIFY IT UP
    userData.role_id = 1

    return await User.create(userData)
  }

  /**
   * Attempts to log in the user if they exist.
   * If not, searches legacy database for old user and attempts migration.
   * 
   * @param {Object} { request, response, auth } 
   * @returns LoginResponse
   * @memberof UserController
   */
  async login ({ request, response, auth }) {
    
    const { username, password } = request.all()

    try {
      const { token } = await auth.attempt(username, password)
      return new LoginResponse(response, 200, { token })
    } catch (noUser) {
      const legacyUserData = await this.legacyDB.getUserByLogin(username, password)
      if (!legacyUserData) {
        return new LoginResponse(response, 401, { 
          message: 'The username or password was incorrect' 
        })
      }
      try {
        await this.handleUserMigration(legacyUserData)
        const { token } = await auth.attempt(username, password)
        return new LoginResponse(response, 200, { token })
      } catch (legacyUser) { // TODO: re-think this because its not very safe
        return new LoginResponse(response, 409, { legacyUser })
      }
    }
  }

  /**
   * Attempts to migrate a user.
   * 
   * @param {Object} legacyUserData 
   * @memberof UserController
   */
  async handleUserMigration (legacyUserData) {
    const migrator = new UserMigrator()
    const isComplete = await this.migrator.isCompleteUser(legacyUserData)
    if (!isComplete) {
      const legacyUser = new LegacyUser()
      legacyUser.newUp(legacyUserData)
      throw legacyUser.toJSON()
    }
    await migrator.migrate(legacyUserData)
  }
}

module.exports = UserController
