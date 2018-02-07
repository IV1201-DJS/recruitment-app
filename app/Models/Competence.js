'use strict'

const Model = use('Model')

class Competence extends Model {
  static boot () {
    super.boot()
  }
  translations () {
    return this.hasMany('App/Models/CompetenceTranslation')
  }
  users () {
    return this
      .belongsToMany('App/Models/User')
      .withPivot(['experience_years'])
    }
}

module.exports = Competence