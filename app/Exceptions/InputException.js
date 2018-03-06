'use strict'

const GE = require('@adonisjs/generic-exceptions')

class InputException extends GE.LogicalException {
}

module.exports = InputException
