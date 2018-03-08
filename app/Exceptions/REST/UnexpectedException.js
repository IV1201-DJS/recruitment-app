'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class UnexpectedException extends LogicalException {
  handle ({ message }, { response }) {
    response
      .status(500)
      .json({ error: message })
  }
}

module.exports = UnexpectedException
