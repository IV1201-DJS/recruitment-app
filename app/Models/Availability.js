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
  static get dates () {
    return super.dates.concat(['from', 'to'])
  }
  static castDates (field, value) {
    if (field === 'from' || field === 'to') {
      return value.format('YYYY-MM-DD')
    }
    return super.formatDates(field, value)
  }

}

module.exports = Availability
