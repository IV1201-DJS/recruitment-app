'use strict'

/*
|--------------------------------------------------------------------------
| ApplicationStatusSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const ApplicationStatus = use('App/Models/ApplicationStatus')

class ApplicationStatusSeeder {
  async run () {
    const statuses = ['ACCEPTED', 'DECLINED']
    statuses.map(async name => await ApplicationStatus.create({ name }))
  }
}

module.exports = ApplicationStatusSeeder
