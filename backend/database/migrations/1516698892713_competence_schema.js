'use strict'

const Schema = use('Schema')

class CompetenceSchema extends Schema {
  up () {
    this.create('competences', (table) => {
      table.increments()
      table.string('name').unique().notNullable()
      table.timestamps()
      table.timestamp('deleted_at').nullable()
    })
  }

  down () {
    this.dropTableIfExists('competences')
  }
}

module.exports = CompetenceSchema
