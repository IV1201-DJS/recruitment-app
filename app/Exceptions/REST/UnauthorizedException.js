'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class UnauthorizedException extends LogicalException {
  handle ({ message }, { response }) {
    response
      .status(401)
      .json({ error: message })
  }
}

module.exports = UnauthorizedException
