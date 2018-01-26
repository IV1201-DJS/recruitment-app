'use strict'

const Schema = use('Schema')

class UserCompetenceSchema extends Schema {
  up () {
    this.create('user_competences', (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('competence_id').unsigned().references('id').inTable('competences')
      table.decimal('experience_years').notNullable()
      table.timestamps()
      table.timestamp('deleted_at').nullable()
      //table.primary(['user_id', 'competence_id'])
    })
  }

  down () {
    this.drop('user_competences')
  }
}

module.exports = UserCompetenceSchema
