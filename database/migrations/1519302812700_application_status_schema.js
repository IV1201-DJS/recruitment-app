'use strict'

const Schema = use('Schema')

class ApplicationStatusSchema extends Schema {
  up () {
    this.create('application_statuses', (table) => {
      table.increments()
      table.string('name').unique().notNullable()
      table.timestamps()
      table.timestamp('deleted_at').nullable()
    })
  }

  down () {
    this.drop('application_statuses')
  }
}

module.exports = ApplicationStatusSchema
