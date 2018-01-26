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
    await Factory.model('App/Models/User').createMany(5000)
  }
}

module.exports = UserSeeder
