'use strict'

const Model = use('Model')

class Availability extends Model {
  /**
   * Retrieves the user of this availability
   * 
   * @returns {User}
   * @memberof Availability
   */
  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Availability
