'use strict'

const Model = use('Model')

/**
 * Represents a translation for a role
 * 
 * @class ApplicationStatusTranslation
 */
class RoleTranslation extends Model {
  /**
   * Retrieves a query for the associated language
   * 
   * @returns {BelongsTo}
   */
  language () {
    return this.belongsTo('App/Models/Language')
  }

  /**
   * Retrieves a query for the associated role
   * 
   * @returns {BelongsTo}
   */
  role () {
    return this.belongsTo('App/Models/Role')
  }
}

module.exports = RoleTranslation
