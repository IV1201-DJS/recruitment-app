'use strict'

/*
|--------------------------------------------------------------------------
| LanguageSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Language = use('App/Models/Language')

class LanguageSeeder {
  async run () {
    const langs = ['sv', 'en']
    const queries = await langs.forEach(async name => await Language.create({ name }))
  }
}

module.exports = LanguageSeeder
