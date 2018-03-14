'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')
const Logger = use('Logger')

/**
 * Exception for when submitted information is unprocessable
 * 
 * @class UnprocessableException
 */
class UnprocessableException extends LogicalException {
  handle ({ message }, { response }) {
    Logger.error(message)
    response
      .status(422)
      .json({ error: message })
  }
}

module.exports = UnprocessableException
