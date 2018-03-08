'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')
const LegacyUser = use('App/Models/LegacyUser')

class MigrationException extends LogicalException {
  handle ({ message }, { response }) {
    const { missingData, oldData } = message
    delete oldData.password
    response
      .status(422)
      .json({ errors: missingData, legacyUser: oldData })
  }
}

module.exports = MigrationException
