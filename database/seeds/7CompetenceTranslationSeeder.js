'use strict'

/*
|--------------------------------------------------------------------------
| CompetenceTranslationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const CompetenceTranslation = use('App/Models/CompetenceTranslation')

class CompetenceTranslationSeeder {
  async run () {
    const competences = Array.from({length: 100}, (x,i) => i+1)
    const langs = [1, 2, 3, 4, 5]
    await competences.forEach(async competence_id => {
      await langs.forEach(async language_id => {
        const { translation } = await Factory.model('App/Models/CompetenceTranslation').make()
        await CompetenceTranslation.create({competence_id, language_id, translation})
      })
    })
  }
}

module.exports = CompetenceTranslationSeeder