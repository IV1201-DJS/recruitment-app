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
    async Applications(obj, { competence_name }) {
      const users = await User
        .query()
        .whereHas('competences', builder => {
          builder
            .where('competences.name', competence_name)
        })
        .fetch()

      return users.toJSON()
    },

    async User(obj, { id }) {
      const user = await User.findOrFail(id)

      return user.toJSON()
    },

    async Competences(obj, { name }) {
      const competences = await Competence.query().where('name', 'ilike', `%${name}%`).fetch()
      return competences.toJSON()
    },

    async CurrentUser(obj, args, { auth }) {
      return await auth.getUser()
    }
  },

  Mutation: {
    async addCompetences(objc, { competenceID, experience_years }, { auth }) {
      const user = await auth.getUser()
      const res = await user.competences().attach(competenceID, row => {
        row.experience_years = experience_years
      })
      
      return user
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

      return role.toJSON()
    }
  },

  UserCompetence: {
    async experience_years(competenceAsJson) {
      const competence = new Competence()
      competence.newUp(competenceAsJson)

      return competence.pivot.experience_years
    },

    async name(competenceAsJson, args, { language }) {
      const competence = new Competence()
      competence.newUp(competenceAsJson)
      const translation = await competence.translatedTo(language)
      return translation || competence.name
    }
  },

  Role: {
    async name(roleAsJson, args, { language }) {
      const role = new Role()
      role.newUp(roleAsJson)
      const translation = await role.translatedTo(language)
      return translation || role.name
    }
  }
}

module.exports = resolvers
