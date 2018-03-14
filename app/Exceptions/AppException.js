'use strict'

const GE = require('@adonisjs/generic-exceptions')
const Logger = use('Logger')

/**
 * Exception for when something is wrong on our end
 * Intended for use with GraphQL
 * 
 * @class AppException
 */
class AppException extends GE.LogicalException {
  constructor(message) {
    super(message)
    Logger.error(message)
  }
}

module.exports = AppException
