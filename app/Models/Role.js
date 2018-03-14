'use strict'

const Model = use('Model')

/**
 * Represents a user's role
 * 
 * @class Role
 */
class Role extends Model {
  /**
   * Retrieves a query for all associated users
   * 
   * @returns {HasMany}
   */
  users () {
    return this.hasMany('App/Models/User')
  }

  /**
   * Retrieves a query for all associated translations
   * 
   * @returns {HasMany}
   */
  translations () {
    return this.hasMany('App/Models/RoleTranslation')
  }
}

module.exports = Role
