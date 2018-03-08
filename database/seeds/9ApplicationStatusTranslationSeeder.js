'use strict'

/*
|--------------------------------------------------------------------------
| ApplicationStatusTranslationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const ApplicationStatusTranslation = use('App/Models/ApplicationStatusTranslation')

class ApplicationStatusTranslationSeeder {
  async run () {
    const statuses = [1, 2]
    const langs = [1, 2]
    for (let application_status_id of statuses) {
      for (let language_id of langs) {
        let translation = application_status_id == 1 ? 'accepted' : 'rejected'
        const prefix = language_id == 1 ? 'sv_' : 'en_'
        translation = prefix + translation
        await ApplicationStatusTranslation.create({application_status_id, language_id, translation})
      }
    }
  }
}

module.exports = ApplicationStatusTranslationSeeder
