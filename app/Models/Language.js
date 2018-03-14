'use strict'

const Model = use('Model')

/**
 * Represents a language to be used for translation
 */
class Language extends Model {
  /**
   * Retrieves a query for all associated competence translations
   * 
   * @returns {HasMany}
   */
  competenceTranslations () {
    return this.hasMany('App/Models/CompetenceTranslation')
  }

  /**
   * Retrieves a query for all associated role translations
   * 
   * @returns {HasMany}
   */
  roleTranslations () {
    return this.hasMany('App/Models/RoleTranslation')
  }

  /**
   * Retrieves a query for all associated application status translations
   * 
   * @returns {HasMany}
   */
  applicationStatusTranslations () {
    return this.hasMany('App/Models/ApplicationStatusTranslation')
  }

  /**
   * Attempts to instantiate the desired language
   * Else, defaults to the default language
   * @param {String} name 
   */
  async setOrDefault (name) {
    const newLang = await Language.query().where('name', name).first()
    const defaultLang = await Language.findOrFail(1)
    this.newUp((newLang && newLang.toJSON()) || defaultLang.toJSON())
    return this
  }
}

module.exports = Language
