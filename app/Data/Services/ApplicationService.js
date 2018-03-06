'use strict'

const Logger = use('Logger')
const Application = use('App/Models/Application')
const db = use('Database')
const authorize = use('App/Services/AuthorizationService')

class ApplicationService {
  constructor(user) {
    this.user = user
  }
  /**
   * Factory function that returns an instance if authorized
   * @param  {[type]}  auth            [description]
   * @return {ApplicationService}      [description]
   */
  static async newInstance(auth, role_names = ['RECRUITER']) {
    await authorize.byRoles(auth, role_names)
    return new ApplicationService(await auth.getUser())
  }

  /**
   * Retrieves a paginated result of applications
   * based on the conditions listed
   * @param  {[type]}  conditions [description]
   * @return {Promise}            [description]
   */
  async fetchApplicationsByConditions(conditions) {
    const {
      status_id,
      competence_ids,
      searched_availability,
      name,
      date_of_registration,
      page,
      page_size
    } = conditions

    const trx = await db.beginTransaction()
    let applications = Application
      .query()
      .transacting(trx)

    applications = this._filterByStatus(applications, status_id)
    applications = this._filterByCompetences(applications, competence_ids)
    applications = this._filterByAvailability(applications, searched_availability)
    applications = this._filterByName(applications, name)
    applications = this._filterByRegistrationDate(applications, date_of_registration)

    try {
      const paginated_applications = await applications.paginate(page, page_size)
      await trx.commit()

      return paginated_applications
    } catch (queryError) {
      Logger.debug(queryError)
      throw 'There was an error when retrieving the applications'
    }
  }

  async fetchById(id) {
    const trx = await db.beginTransaction()
    const application = await Application
      .query()
      .transacting(trx)
      .forShare()
      .where({id})
      .first()
    await trx.commit()

    return application
  }

  async createApplication(information) {
    const user = this.user
    const {
      availabilities,
      competences
    } = information

    const trx = await db.beginTransaction()

    console.log(user)

    if (await user.hasPendingApplication(trx)) {
      trx.commit()
      throw 'User has a pending application already'
    }

    for (let competence of competences) {
      user.competences().attach(competence.id, row => {
        row.experience_years = competence.experience_years
      }, trx)
    }

    for (let availability of availabilities) {
      user.availabilities().save(availability, trx)
    }

    const application = new Application()
    application.user_id = user.id
    await application.save(trx)

    await trx.commit()

    return application
  }

  async updateStatus(information) {
    const {
      application_id,
      new_status
    } = information

    const trx = await db.beginTransaction()
    const application = await Application
      .query()
      .transacting(trx)
      .where({id: application_id})
      .first()
    application.application_status_id = new_status
    await application.save(trx)
    await trx.commit()

    return application
  }

  _filterByStatus(applications, status_id) {
    if (!status_id) {
      return applications
    }
    return applications.where({ status_id })
  }

  _filterByCompetences(applications, competence_ids) {
    if (!competence_ids) {
      return applications
    }
    for (let competence_id of competence_ids) {
      applications = applications.whereHas('user', builder => {
        builder.whereHas('competences', innerBuilder => {
          innerBuilder.where('competences.id', competence_id)
        })
      })
    }
    return applications
  }

  _filterByAvailability(applications, searched_availability) {
    if (!searched_availability) {
      return applications
    }
    return applications.whereHas('user', builder => {
      builder.whereHas('availabilities', innerBuilder => {
        innerBuilder
          .where('availabilities.from', '<=', searched_availability.from)
          .where('availabilities.to', '>=', searched_availability.to)
      })
    })
  }

  _filterByName(applications, name) {
    if (!name) {
      return applications
    }
    return applications.whereHas('user', builder => {
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

  _filterByRegistrationDate(applications, date_of_registration) {
    if (!date_of_registration) {
      return applications
    }
    return applications
      .where('created_at', '>=', date_of_registration + ' 00:00:00')
      .where('created_at', '<=', date_of_registration + ' 23:59:59')
  }
}

module.exports = ApplicationService
