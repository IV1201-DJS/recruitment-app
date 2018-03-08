'use strict'

const Model = use('Model')
const Language = use('App/Models/Language')

class Competence extends Model {
  /**
   * Retrieves all translations for this competence
   * 
   * @returns {HasMany}
   * @memberof Competence
   */
  translations () {
    return this.hasMany('App/Models/CompetenceTranslation')
  }

  /**
   * Retrieves all users with this competence
   * 
   * @returns {BelongsToMany}
   * @memberof Competence
   */
  users () {
    return this
      .belongsToMany('App/Models/User')
      .withPivot(['experience_years'])
  }
}

module.exports = Competence
