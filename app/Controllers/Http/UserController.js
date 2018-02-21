'use strict'

const http = require('http-status-codes')
const { validateAll } = use('Validator')
const User = use('App/Models/User')
const LegacyUser = use('App/Models/LegacyUser')
const UserMigrator = use('App/Services/UserMigrator')
const LegacyDatabase = use('App/Services/LegacyDatabaseHandler')
const RestResponse = use('App/Data/REST/RestResponse')


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
  async store ({ request, response }) {
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
      return new RestResponse(
        response, 
        http.UNPROCESSABLE_ENTITY, 
        { errors: validation.messages() }
      )
    }

    const user = await User.create(userData)
    return new RestResponse(
      response, 
      http.CREATED, 
      { user }
    )
  }

  /**
   * Attempts to log in the user if they exist.
   * If not, searches legacy database for old user and attempts migration.
   * 
   * @param {Object} { request, response, auth } 
   * @returns RestResponse
   * @memberof UserController
   */
  async login ({ request, response, auth }) {
    
    const { username, password } = request.all()

    const rules = {
      username: 'required',
      password: 'required'
    }
    const validation = await validateAll({ username, password }, rules)

    if (validation.fails()) {
      return new RestResponse(
        response, 
        http.UNPROCESSABLE_ENTITY, 
        { errors: validation.messages() }
      )
    }
    
    try {
      const { token } = await auth.attempt(username, password)
      return new RestResponse(response, http.OK, { token })
    } catch (noUser) {
      const legacyUserData = await this.legacyDB.getUserByLogin(username, password)
      if (!legacyUserData) {
        return new RestResponse(
          response, 
          http.UNAUTHORIZED, 
          'The username or password was incorrect'
        )
      }
      try {
        await this._handleUserMigration(legacyUserData)
        const { token } = await auth.attempt(username, password)
        return new RestResponse(
          response, 
          http.OK, 
          { token }
        )
      } catch (legacyUser) { // TODO: re-think this because its not very safe
        return new RestResponse(
          response, 
          http.CONFLICT, 
          { legacyUser }
        )
      }
    }
  }

  /**
   * Attempts to migrate a user.
   * 
   * @param {Object} legacyUserData 
   * @memberof UserController
   * @private
   */
  async _handleUserMigration (legacyUserData) {
    const migrator = new UserMigrator()
    const isComplete = await migrator.isCompleteUser(legacyUserData)
    if (!isComplete) {
      const legacyUser = new LegacyUser()
      legacyUser.newUp(legacyUserData)
      throw legacyUser.toJSON()
    }
    await migrator.migrate(legacyUserData)
  }
}

module.exports = UserController
