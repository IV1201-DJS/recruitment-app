'use strict'

const Model = use('Model')

class Application extends Model {

  user() {
    return this.belongsTo('App/Models/User')
  }

  status() {
    return this.belongsTo('App/Models/ApplicationStatus')
  }

}

module.exports = Application
