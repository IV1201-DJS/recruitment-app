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

  async setOrDefault (locale) {
    const newLang = await Language.query().where('name', locale).first()
    const defaultLang = await Language.findOrFail(1)
    this.newUp((newLang && newLang.toJSON()) || defaultLang.toJSON())
    return this
  }
}

module.exports = Language
