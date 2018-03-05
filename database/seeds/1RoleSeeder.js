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
    const roles = ['APPLICANT', 'RECRUITER', 'ADMIN']
    const queries = roles.map(name => Role.create({ name }))
    await Promise.all(queries)
  }
}

module.exports = RoleSeeder
