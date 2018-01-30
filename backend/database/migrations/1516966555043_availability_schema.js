'use strict'

const Schema = use('Schema')

class AvailabilitySchema extends Schema {
  up () {
    this.create('availabilities', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('from').notNullable()
      table.timestamp('to').notNullable()
      table.timestamps()
      table.timestamp('deleted_at').nullable()
      table.unique(['user_id', 'from', 'to'])
    })
  }

  down () {
    this.dropTableIfExists('availabilities')
  }
}

module.exports = AvailabilitySchema
