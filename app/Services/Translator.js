'use strict'

const CompetenceTranslation = use('App/Models/CompetenceTranslation')
const RoleTranslation = use('App/Models/RoleTranslation')
const Language = use('App/Models/Language')

class Translator {
  constructor (language) {
    this.language = language
  }

  async translateCompetence(competence) {
    return await CompetenceTranslation
    .query()
    .where('competence_id', competence.id)
    .where('language_id', this.language.id)
    .first()
  }

  async translateRole(role) {
    return await RoleTranslation
    .query()
    .where('role_id', role.id)
    .where('language_id', this.language.id)
    .first()
  }
}

module.exports = {
  async createTranslator(locale) {
    const language = await Language.query().where('name', locale).first()
    if (!language) {
      throw `Locale '${locale}' not supported`
    }
    return new Translator(language)
  }
}