'use strict'

const Model = use('Model')

class Availability extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Availability
