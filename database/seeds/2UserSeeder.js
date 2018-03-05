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
    const queries = usernames.map((name, index) => Factory.model('App/Models/User').create({ role_id: (index+1), username: name }))
    await Promise.all(queries)
    const queries2 = await Factory.model('App/Models/User').createMany(97)
  }
}

module.exports = UserSeeder
