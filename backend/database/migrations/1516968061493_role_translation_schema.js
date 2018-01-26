'use strict'

const Schema = use('Schema')

class RoleTranslationSchema extends Schema {
  up () {
    this.create('role_translations', (table) => {
      table.integer('role_id').unsigned().references('id').inTable('roles')
      table.integer('language_id').unsigned().references('id').inTable('languages')
      table.string('translation').notNullable()
      table.timestamps()
      table.timestamp('deleted_at').nullable()
      table.primary(['role_id', 'language_id'])
    })
  }

  down () {
    this.drop('role_translations')
  }
}

module.exports = RoleTranslationSchema
