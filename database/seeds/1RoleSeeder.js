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

const Role = use('App/Models/Role')

class RoleSeeder {
  async run () {
    const roles = ['RECRUITER', 'APPLICANT', 'ADMIN']
    for (let name of roles) {
      await Role.create({ name })
    }
  }
}

module.exports = RoleSeeder
