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
    const roles = [1, 2]
    const langs = [1, 2, 3, 4, 5]
    await roles.forEach(async role_id => {
      await langs.forEach(async language_id => {
        const { translation } = await Factory.model('App/Models/RoleTranslation').make()
        await RoleTranslation.create({role_id, language_id, translation})
      })
    })
  }
}

module.exports = RoleTranslationSeeder
