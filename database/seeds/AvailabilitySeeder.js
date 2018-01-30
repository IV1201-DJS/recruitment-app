'use strict'

/*
|--------------------------------------------------------------------------
| AvailabilitySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class AvailabilitySeeder {
  async run () {
    await Factory.model('App/Models/Availability').createMany(50)
  } 
}

module.exports = AvailabilitySeeder
