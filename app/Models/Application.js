'use strict'

const Model = use('Model')

/**
 * Represents a job application
 * 
 * @class Application
 */
class Application extends Model {

  /**
   * Retrieves a query for the related user
   * 
   * @returns {BelongsTo}
   */
  user () {
    return this.belongsTo('App/Models/User')
  }

  /**
   * Retrieves a query for the related status
   * 
   * @returns {BelongsTo}
   */
  status () {
    return this.belongsTo('App/Models/ApplicationStatus')
  }

}

module.exports = Application
