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
      const user = await User.findOrFail(id)
      return user.toJSON()
    },

    async Competences(_, { name }) {
      const competences = await Competence.query().where('name', 'ilike', `%${name}%`).fetch()
      return competences.toJSON()
    }
  },

  Mutation: {
    async createUser (_, {username, password, email, firstname, lastname, ssn}) {
      return await User.create({ username, password, email, firstname, lastname, ssn, role_id: 2})
    }
  },

  User: {
    async availabilities(userInJson) {
      const user = new User()
      user.newUp(userInJson)
      const availabilities = await user.availabilities().fetch()
      return availabilities.toJSON()
    },
    async competences(userInJson) {
      const user = new User()
      user.newUp(userInJson)
      const competences = await user.competences().fetch()
      return competences.toJSON()
    },
    async role(userInJson) {
      const user = new User()
      user.newUp(userInJson)
      const role = await user.role().fetch()
      return role.toJson()
    }
  },

  UserCompetence: {
    async experience_years(competenceAsJson) {
      const competence = new Competence()
      competence.newUp(competenceAsJson)
      return competence.pivot.experience_years
    }
  }
}

module.exports = resolvers