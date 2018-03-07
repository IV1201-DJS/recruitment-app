'use strict'

const http = require('http-status-codes')
const { validateAll } = use('Validator')
const User = use('App/Models/User')
const LegacyUser = use('App/Models/LegacyUser')
const MigrationService = use('App/Services/MigrationService')
const ForgottenPasswordService = use('App/Services/ForgottenPasswordService')
const ValidationException = use('App/Exceptions/REST/ValidationException')
const UnauthorizedException = use('App/Exceptions/REST/UnauthorizedException')
const { CREDENTIALS_INCORRECT } = use('App/Exceptions/Codes')

/**
 * Controller for creating and authenticating users
 *
 * @class UserController
 */
class UserController {
  constructor () {
    this.passwordService = new ForgottenPasswordService()
    this.migrationService = new MigrationService()
  }

  /**
   * Stores a user in the database
   *
   * @returns {User} created in the new database
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
      throw new ValidationException(validation.messages())
    }

    const user = await User.create(userData)
    
    return response
      .status(http.CREATED)
      .json({ user })
  }

  /**
   * Logs in existing users
   *
   * @returns {Token} used for further authentication
   */
  async login ({ request, response, auth }) {
    const rules = {
      username: 'required',
      password: 'required'
    }
    const credentials = request.only(Object.keys(rules))
    const validation = await validateAll(credentials, rules)

    if (validation.fails()) {
      throw new ValidationException(validation.messages())
    }

    try {
      const { username, password } = credentials
      const { token } = await auth.attempt(username, password)

      return response.json({ token })
    } catch (authError) {
      throw new UnauthorizedException(CREDENTIALS_INCORRECT)
    }
  }

  /**
   * Attempts to restore the password for a user
   * @returns {Object} containing the address emailed to
   * @throws {UnprocessableException, ResourceNotFoundException, UnexpectedException}
   */
  async restorePassword ({ request, response }) {
    const knownInfo = request.only(['ssn', 'username', 'email'])
    const emailed = await this.passwordService.helpRestoreFrom(knownInfo)

    return response.json({ emailed })
  }

  /**
   * Migrates a user from the old database
   * @returns {User} created in the new database
   * @throws {ValidationException}
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

    const user = await this.migrationService
      .attemptMigration(newData)

    return response
      .status(http.CREATED)
      .json({ user })
  }
}

module.exports = UserController
