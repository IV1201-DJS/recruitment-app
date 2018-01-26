'use strict'

const Schema = use('Schema')

class CompetenceTranslationSchema extends Schema {
  up () {
    this.create('competence_translations', (table) => {
      table.integer('competence_id').unsigned().references('id').inTable('competences')
      table.integer('language_id').unsigned().references('id').inTable('languages')
      table.string('translation').notNullable()
      table.timestamps()
      table.timestamp('deleted_at').nullable()
      table.primary(['competence_id', 'language_id'])
    })
  }

  down () {
    this.drop('competence_translations')
  }
}

module.exports = CompetenceTranslationSchema
