'use strict'

const Model = use('Model')

class LegacyUser extends Model {
  static get hidden () {
    return ['password', 'person_id']
  }
}

module.exports = LegacyUser
