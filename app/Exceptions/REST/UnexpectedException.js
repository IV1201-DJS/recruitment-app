'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')
const Logger = use('Logger')

class UnexpectedException extends LogicalException {
  handle ({ message }, { response }) {
    Logger.error(message)
    response
      .status(500)
      .json({ error: message })
  }
}

module.exports = UnexpectedException
