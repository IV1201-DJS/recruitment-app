'use strict'

const GE = require('@adonisjs/generic-exceptions')
const Logger = use('Logger')

/**
 * Exception for when user input is invalid
 * Intended for use with GraphQL
 * 
 * @class InputException
 */
class InputException extends GE.LogicalException {
  constructor(message) {
    super(message)
    Logger.error('*** FROM CONSTRUCTOR ***')
    Logger.error(message)
  }
}

module.exports = InputException
