'use strict'

const Model = use('Model')
const { createTranslator } = use('App/Services/Translator')

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

  async translatedTo (locale) {
    let translator
    try {
      translator = await createTranslator(locale)
    } catch (error) {
      return undefined
    }
    const competenceTranslation = await translator.translateCompetence(this)
    if (competenceTranslation) {
      return competenceTranslation.translation
    }
    return undefined
  }
}

module.exports = Competence
