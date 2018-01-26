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
    async fetchApplications(_, {competence_id}) {

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
    async fetchUser(_, { id }) {
      const user = await User.find(id)
      await user.loadMany(['role', 'availabilities', 'competences'])
      Logger.info(user.toJSON())
      return user.toJSON()
    }
  }
}

module.exports = resolvers