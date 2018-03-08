'use strict'

const Model = use('Model')

class Role extends Model {
  /**
   * Retrieves all users with this role
   * 
   * @returns {HasMany}
   * @memberof Role
   */
  users () {
    return this.hasMany('App/Models/User')
  }

  /**
   * Retrieves all translations for the role
   * 
   * @returns {HasMany}
   * @memberof Role
   */
  translations () {
    return this.hasMany('App/Models/RoleTranslation')
  }
}

module.exports = Role
