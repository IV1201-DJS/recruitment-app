'use strict'

const GE = require('@adonisjs/generic-exceptions')
const Logger = use('Logger')

class AppException extends GE.LogicalException {
  constructor(message) {
    super(message)
    Logger.error('*** FROM CONSTRUCTOR ***')
    Logger.error(message)
  }
}

module.exports = AppException
