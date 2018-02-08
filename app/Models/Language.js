'use strict'

const Model = use('Model')

class Language extends Model {
  /**
   * Retrieves all competence translations in this language
   * 
   * @returns {Collection}
   * @memberof Language
   */
  competenceTranslations () {
    return this.hasMany('App/Models/CompetenceTranslation')
  }

  /**
   * Retrieves all role translations in this language
   * 
   * @returns {Collection}
   * @memberof Language
   */
  roleTranslations () {
    return this.hasMany('App/Models/RoleTranslation')
  }
}

module.exports = Language
