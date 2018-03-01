'use strict'

const Logger = use('Logger')
const User = use('App/Models/User')
const Role = use('App/Models/Role')
const Availability = use('App/Models/Availability')
const Competence = use('App/Models/Competence')
const RoleTranslation = use('App/Models/RoleTranslation')
const CompetenceTranslation = use('App/Models/CompetenceTranslation')
const Language = use('App/Models/Language')
const Application = use('App/Models/Application')
const ApplicationStatus = use('App/Models/ApplicationStatus')

const resolvers = {
  Query: {
    async Applications(obj, { competence_ids, searched_availability, name, date_of_registration, page, page_size }) {
      let applications = Application.query().whereHas('status', builder => {
        builder
          .where('name', 'PENDING')
      })

      if (competence_ids) {
        for (let competence_id of competence_ids) {
          applications = applications.whereHas('user', builder => {
            builder.whereHas('competences', innerBuilder => {
              innerBuilder.where('competences.id', competence_id)
            })
          })
        }
      }

      if (searched_availability) {
        applications = applications.whereHas('user', builder => {
          builder.whereHas('availabilities', innerBuilder => {
            innerBuilder
              .where('availabilities.from', '<=', searched_availability.from)
              .where('availabilities.to', '>=', searched_availability.to)
          })
        })
      }

      if (name) {
        applications = applications.whereHas('user', builder => {
          const splitName = name.split(" ")
          if (splitName.length == 1) {
            builder
              .where('firstname', 'ILIKE', `${splitName[0]}%`)
          } else {
            builder
              .where('firstname', 'ILIKE', `${splitName[0]}%`)
              .where('lastname', 'ILIKE', `${splitName[1]}%`)
          }
        })
      }

      if (date_of_registration) {
        applications = applications
          .where('created_at', '>=', date_of_registration + ' 00:00:00')
          .where('created_at', '<=', date_of_registration + ' 23:59:59')
      }

      try {
        const paginated_applications = await applications.paginate(page, page_size)
        return paginated_applications.toJSON()
      } catch (queryError) {
        console.error(queryError)
        throw 'There was an error when retrieving the applications'
      }
    },

    async Application (obj, { id }) {
      const application = await Application.findOrFail(id)

      return application.toJSON()
    },

    async User(obj, { id }) {
      const user = await User.findOrFail(id)

      return user.toJSON()
    },

    async FindCompetences(obj, { name }) {
      const competences = await Competence
        .query()
        .where('name', 'ilike', `%${name}%`)
        .fetch()

      return competences.toJSON()
    },

    async AllCompetences(obj) {
      const competences = await Competence.query().fetch()

      return competences.toJSON()
    },

    async CurrentUser(obj, args, { auth }) {
      return await auth.getUser()
    }
  },

  Mutation: {
    async addApplication(obc, { competences, availabilities }, { auth }) {
      const user = await auth.getUser()

      if (await user.hasPendingApplication()) {
        throw 'User has a pending application already'
      }

      for (let competence of competences) {
        user.competences().attach(competence.id, row => {
          row.experience_years = competence.experience_years
        })
      }

      for (let availability of availabilities) {
        user.availabilities().save(availability)
      }

      const application = new Application()
      application.user_id = user.id
      const status = await ApplicationStatus.query().where('name', 'PENDING').first()
      application.application_status_id = status.id
      await application.save()

      return application.toJSON()
    },

    async addCompetence(obj, { competence_id, experience_years }, { auth }) {
      const user = await auth.getUser()
      await user.competences().attach(competence_id, row => {
        row.experience_years = experience_years
      })

      return user.toJSON()
    },

    async addAvailability(obj, { availability }, { auth }) {
      const user = await auth.getUser()
      const { from, to } = availability

      const instance = new Availability()
      instance.user_id = user.id
      instance.from = from
      instance.to = to

      await user.availabilities().save(instance)

      return instance.toJSON()
    },

    async updateApplicationStatus(obj, { application_id, new_status }) {
      const status = await ApplicationStatus.query().where('name', new_status).first()
      const application = await Application.query().where('id', application_id).update('status', status.id)
      
      return application.toJSON
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

      return status.toJSON()
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
