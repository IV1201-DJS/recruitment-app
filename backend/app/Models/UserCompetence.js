'use strict'

const Model = use('Model')

class UserCompetence extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  competence () {
    return this.belongsTo('App/Models/Competence')
  }
}

module.exports = UserCompetence
