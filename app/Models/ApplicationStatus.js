'use strict'

const Model = use('Model')

/**
 * Represents the status of an application
 * 
 * @class ApplicationStatus
 */
class ApplicationStatus extends Model {
  /**
   * Retrieves a query for the associated application
   * 
   * @returns {HasMany}
   */
  application () {
    return this.hasMany('App/Models/Application')
  }

  /**
   * Retrieves a query for all associated translations
   * 
   * @returns {HasMany}
   */
  translations () {
    return this.hasMany('App/Models/ApplicationStatusTranslation')
  }
}

module.exports = ApplicationStatus
