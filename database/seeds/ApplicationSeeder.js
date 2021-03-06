'use strict'

/*
|--------------------------------------------------------------------------
| ApplicationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Application = use('App/Models/Application')
const ApplicationStatus = use('App/Models/ApplicationStatus')

class ApplicationSeeder {
  async run () {
    for (let i = 1; i <= 25; i++) {
      const application = new Application()
      application.user_id = i
      await application.save()
    }
  }
}

module.exports = ApplicationSeeder
