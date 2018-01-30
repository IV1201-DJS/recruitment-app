'use strict'

const Schema = use('Schema')

class UserCompetenceSchema extends Schema {
  up () {
    this.create('competence_user', (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('competence_id').unsigned().references('id').inTable('competences').onDelete('CASCADE')
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

module.exports = UserCompetenceSchema
