'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')
const Logger = use('Logger')

class ResourceNotFoundException extends LogicalException {
  handle ({ message }, { response }) {
    Logger.error(message)
    response
      .status(404)
      .json({ error: message })
  }
}

module.exports = ResourceNotFoundException
