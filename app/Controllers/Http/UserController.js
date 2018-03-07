'use strict'

const http = require('http-status-codes')
const { validateAll } = use('Validator')
const User = use('App/Models/User')
const LegacyUser = use('App/Models/LegacyUser')
const MigrationService = use('App/Services/MigrationService')
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
    this.migrationService = new MigrationService()
  }

  /**
   * Stores a user in the database
   *
   * @returns { User }
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
   * Logs in existing users
   *
   * @returns { RestResponse }
   */
  async login ({ request, response, auth }) {
    const {
      username,
      password
    } = request.all()

    const rules = {
      username: 'required',
      password: 'required'
    }

    const validation = await validateAll({
      username,
      password
    }, rules)

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
      return new RestResponse(
        response,
        http.UNAUTHORIZED,
        'The username or password was incorrect'
      )
    }
  }

  /**
   * Migrates a user from the old database
   * @returns { RestResponse }
   * @throws { IncompleteProfileException }
   */
  async migrate ({ request, response }) {
    const newData = request.only([
      'name',
      'surname',
      'ssn',
      'email',
      'role_id',
      'username',
      'password'
    ])

    const oldData = await this.migrationService
      .findLegacyData(newData.username, newData.password)

    if (!oldData) {
      return new RestResponse(
        response,
        http.UNAUTHORIZED,
        'The username or password was incorrect'
      )
    }

    const user = await this.migrationService
      .attemptMigration(newData, oldData)

    return new RestResponse(
      response,
      http.CREATED,
      { user: user.toJSON() }
    )
  }
}

module.exports = UserController
