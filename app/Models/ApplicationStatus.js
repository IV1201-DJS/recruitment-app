'use strict'

const Model = use('Model')

class ApplicationStatus extends Model {
  
  application() {
    return this.hasMany('App/Models/Application')
  }
}

module.exports = ApplicationStatus
