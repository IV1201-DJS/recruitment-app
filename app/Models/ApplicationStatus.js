'use strict'

const Model = use('Model')

class ApplicationStatus extends Model {
  /**
   * Retrieves the associated application
   * 
   * @returns {HasMany}
   */
  application () {
    return this.hasMany('App/Models/Application')
  }

  /**
   * Retrieves all translations for the role
   * 
   * @returns {HasMany}
   */
  translations () {
    return this.hasMany('App/Models/ApplicationStatusTranslation')
  }
}

module.exports = ApplicationStatus
