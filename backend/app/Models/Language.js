'use strict'

const Model = use('Model')

class Language extends Model {
  competences () {
    return this.hasMany('App/Models/CompetenceTranslation')
  }
  roles () {
    return this.hasMany('App/Models/Role')
  }
}

module.exports = Language
