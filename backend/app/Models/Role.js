'use strict'

const Model = use('Model')

class Role extends Model {
  users () {
    return this.hasMany('App/Models/User')
  }
  translations () {
    return this.hasMany('App/Model/RoleTranslation')
  }
}

module.exports = Role
