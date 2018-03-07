'use strict'

const GE = require('@adonisjs/generic-exceptions')

class AppException extends GE.LogicalException {
}

module.exports = AppException
