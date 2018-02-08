'use strict'

const Model = use('Model')
const Language = use('App/Models/Language')

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

  async translatedTo (language) {
    const { translation } = await this.translations().where('language_id', language.id).first()
    return translation
  }
}

module.exports = Competence
