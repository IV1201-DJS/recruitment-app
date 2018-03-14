'use strict'

const Model = use('Model')

/**
 * Represents a translation for an application status
 * 
 * @class ApplicationStatusTranslation
 */
class ApplicationStatusTranslation extends Model {
  /**
   * Retrieves a query for the associated language
   * 
   * @returns {BelongsTo}
   */
  language () {
    return this.belongsTo('App/Models/Language')
  }

  /**
   * Retrieves a query for the associated status
   * 
   * @returns {BelongsTo}
   */
  applicationStatus () {
    return this.belongsTo('App/Models/ApplicationStatus')
  }
}

module.exports = ApplicationStatusTranslation
