'use strict'

const CompetenceTranslation = use('App/Models/CompetenceTranslation')
const RoleTranslation = use('App/Models/RoleTranslation')
const Language = use('App/Models/Language')
/**
 * Service for translating roles and competences
 * 
 * @class Translator
 */
class Translator {
  /**
   * Creates an instance of Translator.
   * @param {Language} language 
   * @memberof Translator
   */
  constructor (language) {
    this.language = language
  }

  /**
   * Translates a competence to the language of the translator
   * 
   * @param {Competence} competence 
   * @returns {CompetenceTranslation}
   * @memberof Translator
   */
  async translateCompetence(competence) {
    return await CompetenceTranslation
    .query()
    .where('competence_id', competence.id)
    .where('language_id', this.language.id)
    .first()
  }

  /**
   * Translates a role to the language of the translator
   * 
   * @param {Role} role 
   * @returns {RoleTranslation}
   * @memberof Translator
   */
  async translateRole(role) {
    return await RoleTranslation
    .query()
    .where('role_id', role.id)
    .where('language_id', this.language.id)
    .first()
  }
}

module.exports = {
  /**
   * Factory for creating a translator with a certain language
   * 
   * @param {String} locale 
   * @returns {Translator}
   */
  async createTranslator(locale) {
    const language = await Language.query().where('name', locale).first()
    if (!language) {
      throw `Locale '${locale}' not supported`
    }
    return new Translator(language)
  }
}