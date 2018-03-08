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
    await ApplicationStatusTranslation.create({
      application_status_id: 1,
      language_id: 2,
      translation: 'Accepted'
    })

    await ApplicationStatusTranslation.create({
      application_status_id: 2,
      language_id: 2,
      translation: 'Rejected'
    })

    await ApplicationStatusTranslation.create({
      application_status_id: 1,
      language_id: 1,
      translation: 'Accepterad'
    })

    await ApplicationStatusTranslation.create({
      application_status_id: 2,
      language_id: 1,
      translation: 'Nekad'
    })
  }
}

module.exports = ApplicationStatusTranslationSeeder
