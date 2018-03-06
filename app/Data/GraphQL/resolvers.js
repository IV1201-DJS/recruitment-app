'use strict'

const Logger = use('Logger')
const Application = use('App/Models/Application')
const Competence = use('App/Models/Competence')
const User = use('App/Models/User')
const Role = use('App/Models/Role')
const ApplicationStatusService = use('App/Data/Services/ApplicationStatusService')
const ApplicationService = use('App/Data/Services/ApplicationService')
const CompetenceService = use('App/Data/Services/CompetenceService')
const UserService = use('App/Data/Services/UserService')

const resolvers = {
  Query: {
    async Applications(obj, conditions, { auth }) {
      const applicationService = await ApplicationService.newInstance(auth)
      const applications = await applicationService.fetchApplicationsByConditions(conditions)
      return applications.toJSON()
    },

    async Application (obj, { id }, { auth }) {
      const applicationService = await ApplicationService.newInstance(auth)
      const application = await applicationService.fetchById(id)

      return application.toJSON()
    },

    async User(obj, { id }, { auth }) {
      const userService = await UserService.newInstance(auth)
      const user = await userService.fetchById(id)

      return user.toJSON()
    },

    async FindCompetences(obj, { name }, { auth }) {
      const competenceService = await CompetenceService.newInstance(auth, ['APPLICANT', 'RECRUITER'])
      const competences = await competenceService.fetchWithSimilarName(name)

      return competences.toJSON()
    },

    async AllCompetences(obj, args, { auth }) {
      const competenceService = await CompetenceService.newInstance(auth, ['APPLICANT', 'RECRUITER'])
      const competences = await competenceService.fetchAll()

      return competences.toJSON()
    },

    async CurrentUser(obj, args, { auth }) {
      return await auth.getUser()
    },

    async AllApplicationStatuses(obj, args, { auth }) {
      const applicationStatusService = await ApplicationStatusService.newInstance(auth)
      const statuses = await applicationStatusService.fetchAll()

      return statuses.toJSON()
    }
  },

  Mutation: {
    async addApplication(obc, information, { auth }) {
      const applicationService = await ApplicationService.newInstance(auth, ['APPLICANT'])
      const application = await applicationService.createApplication(information)
      return application.toJSON()
    },

    async updateApplicationStatus(obj, information, { auth }) {
      const applicationService = await ApplicationService.newInstance(auth)
      const application = await applicationService.updateStatus(information)
      return application.toJSON()
    }
  },

  Application: {
    async user(applicationInJson) {
      const application = new Application()
      application.newUp(applicationInJson)
      const user = await application.user().fetch()

      return user.toJSON()
    },

    async status(applicationInJson) {
      const application = new Application()
      application.newUp(applicationInJson)
      const status = await application.status().fetch()
      return status ? status.toJSON() : null
    },

    async date_of_registration(applicationInJson) {
      return applicationInJson.created_at
    },
  },
  User: {
    /**
     * @param {any} userInJson
     * @returns any
     */
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
