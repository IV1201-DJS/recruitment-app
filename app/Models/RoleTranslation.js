'use strict'

const Model = use('Model')

class RoleTranslation extends Model {
  /**
   * Retrieves the language of the translation
   * 
   * @returns {Language}
   * @memberof RoleTranslation
   */
  language () {
    return this.belongsTo('App/Model/Language')
  }

  /**
   * Retrieves the translated role
   * 
   * @returns {Role}
   * @memberof RoleTranslation
   */
  role () {
    return this.belongsTo('App/Model/Role')
  }
}

module.exports = RoleTranslation
