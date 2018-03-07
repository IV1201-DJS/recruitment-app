'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class UnprocessableException extends LogicalException {
  handle ({ message }, { response }) {
    response
      .status(422)
      .json({ error: message })
  }
}

module.exports = UnprocessableException
