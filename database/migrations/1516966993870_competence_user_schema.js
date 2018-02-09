'use strict'

const Schema = use('Schema')

class CompetenceUserSchema extends Schema {
  up () {
    this.create('competence_user', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.integer('competence_id').unsigned().references('id').inTable('competences').onDelete('CASCADE').notNullable()
      table.decimal('experience_years').notNullable()
      table.timestamps()
      table.timestamp('deleted_at').nullable()
      //table.primary(['user_id', 'competence_id'])
    })
  }

  down () {
    this.dropTableIfExists('competence_user')
  }
}

module.exports = CompetenceUserSchema
