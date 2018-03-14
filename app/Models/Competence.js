'use strict'

const Model = use('Model')
const Language = use('App/Models/Language')

/**
 * Represents a work-related competence
 * 
 * @class Competence
 */
class Competence extends Model {
  /**
   * Retrieves a query for all associated translations
   * 
   * @returns {HasMany}
   */
  translations () {
    return this.hasMany('App/Models/CompetenceTranslation')
  }

  /**
   * Retrieves a query for all users with this competence
   * 
   * @returns {belongsToMany}
   */
  users () {
    return this
      .belongsToMany('App/Models/User')
      .withPivot(['experience_years'])
  }
}

module.exports = Competence
