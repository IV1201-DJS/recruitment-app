'use strict'

const Model = use('Model')

class Competence extends Model {
  /**
   * Retrieves all translations for this competence
   * 
   * @returns {Collection}
   * @memberof Competence
   */
  translations () {
    return this.hasMany('App/Models/CompetenceTranslation')
  }

  /**
   * Retrieves all users with this competence
   * 
   * @returns {Collection}
   * @memberof Competence
   */
  users () {
    return this
      .belongsToMany('App/Models/User')
      .withPivot(['experience_years'])
    }
}

module.exports = Competence
