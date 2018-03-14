'use strict'

const Model = use('Model')

/**
 * Represents a translation for a competence
 * 
 * @class ApplicationStatusTranslation
 */
class CompetenceTranslation extends Model {
  /**
   * Retrieves a query for the associated language
   * 
   * @returns {BelongsTo}
   */
  language () {
    return this.belongsTo('App/Models/Language')
  }

  /**
   * Retrieves a query for the associated competence
   * 
   * @returns {BelongsTo}
   */
  competence () {
    return this.belongsTo('App/Models/Competence')
  }
}

module.exports = CompetenceTranslation
