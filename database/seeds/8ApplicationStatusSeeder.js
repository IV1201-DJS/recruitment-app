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
    const statuses = ['PENDING', 'ACCEPTED', 'DECLINED']
    for (let s of statuses) {
      const status = new ApplicationStatus()
      status.name = s
      await status.save()
    }
  }
}

module.exports = ApplicationStatusSeeder
