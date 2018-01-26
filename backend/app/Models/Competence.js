'use strict'

const Model = use('Model')

class Competence extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }
  translations () {
    return this.hasMany('App/Models/CompetenceTranslation')
  }
}

module.exports = Competence
