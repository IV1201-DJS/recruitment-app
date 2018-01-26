'use strict'

const Model = use('Model')

class CompetenceTranslation extends Model {
  language () {
    return this.belongsTo('App/Models/Language')
  }
  competence () {
    return this.belongsTo('App/Models/Competence')
  }
}

module.exports = CompetenceTranslation
