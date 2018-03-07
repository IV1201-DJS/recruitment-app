'use strict'

const Schema = use('Schema')

class ApplicationSchema extends Schema {
  up () {
    this.create('applications', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.integer('application_status_id').unsigned().references('id').inTable('application_statuses').onDelete('CASCADE')
      table.timestamps()
      table.timestamp('deleted_at').nullable()
    })
  }

  down () {
    this.drop('applications')
  }
}

module.exports = ApplicationSchema
