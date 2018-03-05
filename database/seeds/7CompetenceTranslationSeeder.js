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
    const competences = Array.from({length: 50}, (x,i) => i+1)
    const langs = [1, 2]
    for (let competence_id of competences) {
      for (let language_id of langs) {
        const { translation } = await Factory.model('App/Models/CompetenceTranslation').make()
        await CompetenceTranslation.create({competence_id, language_id, translation})
      }
    }
  }
}

module.exports = CompetenceTranslationSeeder
