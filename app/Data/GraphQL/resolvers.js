'use strict'

const Logger = use('Logger')
const Application = use('App/Models/Application')
const Competence = use('App/Models/Competence')
const User = use('App/Models/User')
const Role = use('App/Models/Role')
const ApplicationStatusRepository = use('App/Data/Repositories/ApplicationStatusRepository')
const ApplicationRepository = use('App/Data/Repositories/ApplicationRepository')
const CompetenceRepository = use('App/Data/Repositories/CompetenceRepository')
const UserRepository = use('App/Data/Repositories/UserRepository')
const RelationRepository = use('App/Data/Repositories/RelationRepository')
const relations = new RelationRepository()

const resolvers = {
  Query: {
    async Applications(obj, conditions, { auth }) {
      const applicationRepository = await ApplicationRepository.newInstance(auth)
      const applications = await applicationRepository.fetchByConditions(conditions)
      return applications.toJSON()
    },

    async Application (obj, { id }, { auth }) {
      const applicationRepository = await ApplicationRepository.newInstance(auth)
      const application = await applicationRepository.fetchById(id)

      return application.toJSON()
    },

    async User(obj, { id }, { auth }) {
      const userRepository = await UserRepository.newInstance(auth)
      const user = await userRepository.fetchById(id)

      return user.toJSON()
    },

    async FindCompetences(obj, { name }, { auth }) {
      const competenceRepository = await CompetenceRepository.newInstance(auth, ['APPLICANT', 'RECRUITER'])
      const competences = await competenceRepository.fetchWithSimilarName(name)

      return competences.toJSON()
    },

    async AllCompetences(obj, args, { auth }) {
      const competenceRepository = await CompetenceRepository.newInstance(auth, ['APPLICANT', 'RECRUITER'])
      const competences = await competenceRepository.fetchAll()

      return competences.toJSON()
    },

    async CurrentUser(obj, args, { auth }) {
      return await auth.getUser()
    },

    async AllApplicationStatuses(obj, args, { auth }) {
      const applicationStatusRepository = await ApplicationStatusRepository.newInstance(auth)
      const statuses = await applicationStatusRepository.fetchAll()

      return statuses.toJSON()
    }
  },

  Mutation: {
    async addApplication(obc, information, { auth }) {
      const applicationRepository = await ApplicationRepository.newInstance(auth, ['APPLICANT'])
      const application = await applicationRepository.createApplication(information)
      return application.toJSON()
    },

    async updateApplicationStatus(obj, information, { auth }) {
      const applicationRepository = await ApplicationRepository.newInstance(auth)
      const application = await applicationRepository.updateStatus(information)
      return application.toJSON()
    }
  },

  Application: {
    async user(applicationInJson) {
      const application = new Application()
      application.newUp(applicationInJson)
      const user = await relations.fetchRelatedUser(application)

      return user.toJSON()
    },

    async status(applicationInJson) {
      const application = new Application()
      application.newUp(applicationInJson)
      const status = await relations.fetchRelatedStatus(application)
      return status ? status.toJSON() : null
    },

    async date_of_registration(applicationInJson) {
      return applicationInJson.created_at
    },
  },
  User: {
    async availabilities(userInJson) {
      const user = new User()
      user.newUp(userInJson)
      const availabilities = await relations.fetchRelatedAvailabilities(user)

      return availabilities.toJSON()
    },

    async competences(userInJson) {
      const user = new User()
      user.newUp(userInJson)
      const competences = await relations.fetchRelatedCompetences(user)

      return competences.toJSON()
    },

    async role(userInJson) {
      const user = new User()
      user.newUp(userInJson)
      const role = await relations.fetchRelatedRole(user)

      return role.toJSON()
    }
  },

  Competence: {
    async name(competenceAsJson, args, { language }) {
      const competence = new Competence()
      competence.newUp(competenceAsJson)
      const translation = await relations.fetchRelatedTranslation(competence, language)

      return translation || competence.name
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
      const translation = await relations.fetchRelatedTranslation(competence, language)

      return translation || competence.name
    }
  },

  Role: {
    async name(roleAsJson, args, { language }) {
      const role = new Role()
      role.newUp(roleAsJson)
      const translation = await relations.fetchRelatedTranslation(role, language)

      return translation || role.name
    }
  }
}

module.exports = resolvers
