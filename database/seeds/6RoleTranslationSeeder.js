'use strict'

/*
|--------------------------------------------------------------------------
| RoleTranslationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const RoleTranslation = use('App/Models/RoleTranslation')

class RoleTranslationSeeder {
  async run () {
    const roles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const langs = [1, 2, 3, 4, 5]
    for (let role_id of roles) {
      for (let language_id of langs) {
        const { translation } = await Factory.model('App/Models/RoleTranslation').make()
        await RoleTranslation.create({role_id, language_id, translation})
      }
    }
  }
}

module.exports = RoleTranslationSeeder
