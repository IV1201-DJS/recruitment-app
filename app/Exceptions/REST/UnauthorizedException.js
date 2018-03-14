'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')
const Logger = use('Logger')

/**
 * Exception for when an action is unauthorized
 * 
 * @class UnauthorizedException
 */
class UnauthorizedException extends LogicalException {
  handle ({ message }, { response }) {
    Logger.error(message)
    response
      .status(401)
      .json({ error: message })
  }
}

module.exports = UnauthorizedException
