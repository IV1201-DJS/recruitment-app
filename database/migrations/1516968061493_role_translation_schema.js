'use strict'

const Schema = use('Schema')

class RoleTranslationSchema extends Schema {
  up () {
    this.create('role_translations', (table) => {
      table.increments()
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE').notNullable()
      table.integer('language_id').unsigned().references('id').inTable('languages').onDelete('CASCADE').notNullable()
      table.string('translation').notNullable()
      table.timestamps()
      table.timestamp('deleted_at').nullable()
    })
  }

  down () {
    this.dropTableIfExists('role_translations')
  }
}

module.exports = RoleTranslationSchema
