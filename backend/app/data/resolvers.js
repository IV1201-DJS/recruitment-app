'use strict'

const Logger = use('Logger')
const User = use('App/Models/User')
const Role = use('App/Models/Role')
const Availability = use('App/Models/Availability')
const UserCompetence = use('App/Models/UserCompetence')
const Competence = use('App/Models/Competence')
const RoleTranslation = use('App/Models/RoleTranslation')
const CompetenceTranslation = use('App/Models/CompetenceTranslation')
const Language = use('App/Models/Language')

const resolvers = {
  Query: {
    async Applications(_, {competence_id}) {

      /*
          .whereHas('availabilities', builder => {
          builder
            .where('from', '<=', period.from)
            .where('to', '>=', period.to)
        })
      */
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
      Logger.debug(user.toJSON())
      return user.toJSON()
    },
    async Competences(_, { name }) {
      const competences = await Competence.query().where('name', 'ilike', `%${name}%`).fetch()
      return competences.toJSON()
    }
  }
}

module.exports = resolvers