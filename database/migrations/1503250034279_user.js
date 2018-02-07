'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', table => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('firstname').notNullable()
      table.string('lastname').notNullable()
      table.string('ssn').notNullable()
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE').notNullable()
      table.timestamps()
      table.timestamp('deleted_at').nullable()
    })
  }

  down () {
    this.dropTableIfExists('users')
  }
}

module.exports = UserSchema
