'use strict'

/*
|--------------------------------------------------------------------------
| CompetenceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class CompetenceSeeder {
  async run () {
    await Factory.model('App/Models/Competence').createMany(50)
  }
}

module.exports = CompetenceSeeder
