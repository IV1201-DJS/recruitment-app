'use strict'

/*
|--------------------------------------------------------------------------
| UsercompetenceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const User = use('App/Models/User')
const Competence = use('App/Models/Competence')

class UsercompetenceSeeder {
  async run () {
    const ids = [3,4,5,6,7,8,9,10]
    await Promise.all(ids.map(async id => {
      const user = await User.find(id)

      return await user.competences().attach([id, id+1], row => {
        row.experience_years = 1.0
      })
    }))
  }
}

module.exports = UsercompetenceSeeder
