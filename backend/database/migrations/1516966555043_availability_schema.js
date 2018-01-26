'use strict'

const Schema = use('Schema')

class AvailabilitySchema extends Schema {
  up () {
    this.create('availabilities', (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamp('from').notNullable()
      table.timestamp('to').notNullable()
      table.timestamps()
      table.timestamp('deleted_at').nullable()
      table.primary(['user_id', 'from', 'to'])
    })
  }

  down () {
    this.drop('availabilities')
  }
}

module.exports = AvailabilitySchema
