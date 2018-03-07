'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ResourceNotFoundException extends LogicalException {
  handle ({ message }, { response }) {
    response
      .status(404)
      .json({ error: message })
  }
}

module.exports = ResourceNotFoundException
