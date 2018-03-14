'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

/**
 * Exception for when validation fails
 * 
 * @class ValidationException
 */
class ValidationException extends LogicalException {
  handle ({ message }, { response }) {
    response
      .status(422)
      .json({ errors: message })
  }
}

module.exports = ValidationException
