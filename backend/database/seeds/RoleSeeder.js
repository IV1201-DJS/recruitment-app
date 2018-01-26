'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class RoleSeeder {
  async run () {
    await Factory.model('App/Models/Role').createMany(10)
  }
}

module.exports = RoleSeeder
