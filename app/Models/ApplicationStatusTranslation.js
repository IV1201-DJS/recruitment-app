'use strict'

const Model = use('Model')

class ApplicationStatusTranslation extends Model {
  /**
   * Retrieves the language of the translation
   * 
   * @returns {Language}
   * @memberof RoleTranslation
   */
  language () {
    return this.belongsTo('App/Models/Language')
  }

  /**
   * Retrieves the translated application status
   * 
   * @returns {Role}
   * @memberof RoleTranslation
   */
  applicationStatus () {
    return this.belongsTo('App/Models/ApplicationStatus')
  }
}

module.exports = ApplicationStatusTranslation
