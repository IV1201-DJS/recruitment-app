'use strict';

const Logger = use('Logger')
const db = use('Database')
const Availability = use('App/Models/Availability')
const Application = use('App/Models/Application')
const AppException = use('App/Exceptions/AppException')
const InputException = use('App/Exceptions/InputException')
const authorize = use('App/Services/AuthorizationService')
const {
  CONDITIONS_INVALID,
  PENDING_APPLICATION_EXISTS,
  APPLICATION_STATUS_ALREADY_SET,
  AVAILABILITY_PARAMETERS_INVALID
} = use('App/Exceptions/Codes')

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
      throw new InputException(CONDITIONS_INVALID)
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

    if (await user.hasPendingApplication(trx)) {
      await trx.commit()
      throw new AppException(PENDING_APPLICATION_EXISTS)
    }

    await this._saveCompetences(user, competences, trx)
    await this._saveAvailabilities(user, availabilities, trx)

    const application = await Application
      .create({ user_id: user.id }, trx)

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

    if (application.application_status_id) {
      throw new AppException(APPLICATION_STATUS_ALREADY_SET)
    }

    application.application_status_id = new_status
    await application.save(trx)
    await trx.commit()

    return application
  }

  /* TODO: could be in availability service */
  async _saveAvailabilities(user, availabilities, trx) {
    try {
      for (let {from, to} of availabilities) {
        await Availability.create({from, to, user_id: user.id }, trx)
      }
    } catch (e) {
      throw new InputException(AVAILABILITY_PARAMETERS_INVALID)
    }
  }

  /* TODO: could be in competence service */
  async _saveCompetences(user, competences, trx) {
    try {
      for (let {id, experience_years} of competences) {
        await user.competences().attach(id, row => {
          row.experience_years = experience_years
        }, trx)
      }
    } catch (e) {
      throw new InputException(COMPETENCE_PARAMETERS_INVALID)
    }
  }

  _filterByStatus(applications, application_status_id) {
    if (!application_status_id) {
      return applications
    }
    return applications.where({ application_status_id })
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
