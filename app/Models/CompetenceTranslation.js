'use strict'

const Model = use('Model')

class CompetenceTranslation extends Model {
  /**
   * Retrieves the language of the translation
   * 
   * @returns {Language}
   * @memberof CompetenceTranslation
   */
  language () {
    return this.belongsTo('App/Models/Language')
  }

  /**
   * Retrieves the translated competence
   * 
   * @returns {Competence}
   * @memberof CompetenceTranslation
   */
  competence () {
    return this.belongsTo('App/Models/Competence')
  }
}

module.exports = CompetenceTranslation
