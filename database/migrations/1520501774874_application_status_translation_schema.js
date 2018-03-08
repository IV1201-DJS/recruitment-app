'use strict'

const Schema = use('Schema')

class ApplicationStatusTranslationSchema extends Schema {
  up () {
    this.create('application_status_translations', (table) => {
      table.increments()
      table.integer('application_status_id').unsigned().references('id').inTable('application_statuses').onDelete('CASCADE').notNullable()
      table.integer('language_id').unsigned().references('id').inTable('languages').onDelete('CASCADE').notNullable()
      table.string('translation').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('application_status_translations')
  }
}

module.exports = ApplicationStatusTranslationSchema
