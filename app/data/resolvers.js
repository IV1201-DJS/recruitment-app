'use strict'

const Logger = use('Logger')
const User = use('App/Models/User')
const Role = use('App/Models/Role')
const Availability = use('App/Models/Availability')
const Competence = use('App/Models/Competence')
const RoleTranslation = use('App/Models/RoleTranslation')
const CompetenceTranslation = use('App/Models/CompetenceTranslation')
const Language = use('App/Models/Language')

const resolvers = {
  Query: {
    async Applications(_, {competence_id}) {
      const users = await User
        .query()
        .whereHas('competences', builder => {
          builder
            .where('competences.id', competence_id)
        })
        .with('competences')
        .fetch()
      return users.toJSON()
    },

    async User(_, { id }) {
      const user = await User.query()
        .where({id})
        .with('role')
        .with('availabilities')
        .with('competences')
        .first()
      return user.toJSON()
    },

    async Competences(_, { name }) {
      const competences = await Competence.query().where('name', 'ilike', `%${name}%`).fetch()
      return competences.toJSON()
    }
  },

  Mutation: {
    async login (_, { username, password }, { auth }) {
      const { token } = await auth.attempt(username, password)
      return token
    }

  }
}

module.exports = resolvers