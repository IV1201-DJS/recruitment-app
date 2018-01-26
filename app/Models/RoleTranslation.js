'use strict'

const Model = use('Model')

class RoleTranslation extends Model {
  language () {
    return this.belongsTo('App/Model/Language')
  }
  role () {
    return this.belongsTo('App/Model/Role')
  }
}

module.exports = RoleTranslation
