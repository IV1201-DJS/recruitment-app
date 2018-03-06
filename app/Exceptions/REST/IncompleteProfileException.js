'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class IncompleteProfileException extends LogicalException {
  handle ({ message }, { response }) {
    response
      .status(422)
      .json(message)
  }
}

module.exports = IncompleteProfileException
