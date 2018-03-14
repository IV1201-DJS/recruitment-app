'use strict'

const Model = use('Model')

/**
 * Represents a date interval where
 * a user is available for work
 * 
 * @class Availability
 */
class Availability extends Model {
  /**
   * Retrieves a query for the associated user
   * 
   * @returns {BelongsTo}
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
