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
    const roles = [1, 2, 3]
    const langs = [1, 2]
    for (let role_id of roles) {
      for (let language_id of langs) {
        let { translation } = await Factory.model('App/Models/RoleTranslation').make()
        const prefix = language_id == 1 ? 'sv_' : 'en_'
        translation = prefix + translation
        await RoleTranslation.create({role_id, language_id, translation})
      }
    }
  }
}

module.exports = RoleTranslationSeeder
