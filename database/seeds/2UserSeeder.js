'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class UserSeeder {
  async run () {
    const usernames = ['applicant', 'recruiter', 'admin']
    usernames.map(async (name, index) => {
      await Factory.model('App/Models/User').create({ role_id: (index+1), username: name })
    })
    await Factory.model('App/Models/User').createMany(97)
  }
}

module.exports = UserSeeder
