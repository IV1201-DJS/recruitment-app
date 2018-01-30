'use strict'

const Model = use('Model')

class Competence extends Model {
  translations () {
    return this.hasMany('App/Models/CompetenceTranslation')
  }
  competences () {
    return this
      .belongsToMany('App/Models/User')
      .withPivot(['experience_years'])
      .pivotTable('competences')
  }
}

module.exports = Competence
