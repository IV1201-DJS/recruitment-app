'use strict'

const Logger = use('Logger')
const Application = use('App/Models/Application')

class ApplicationService {
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

    let applications = Application.query()

    //console.log(conditions)

    if (status_id) {
      applications = this._filterByStatus(applications, status_id)
    }

    if (competence_ids) {
      applications = this._filterByCompetences(applications, competence_ids)
    }

    if (searched_availability) {
      applications = this._filterByAvailability(applications, searched_availability)
    }

    if (name) {
      applications = this._filterByName(applications, name)
    }

    if (date_of_registration) {
      applications = this._filterByRegistrationDate(applications, date_of_registration)
    }

    try {
      const paginated_applications = await applications.paginate(page, page_size)
      console.log(paginated_applications)
      return paginated_applications
    } catch (queryError) {
      Logger.debug(queryError)
      throw 'There was an error when retrieving the applications'
    }
  }

  _filterByStatus(applications, status_id) {
    return applications.where({ status_id })
  }

  _filterByCompetences(applications, competence_ids) {
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
    return applications.whereHas('user', builder => {
      builder.whereHas('availabilities', innerBuilder => {
        innerBuilder
          .where('availabilities.from', '<=', searched_availability.from)
          .where('availabilities.to', '>=', searched_availability.to)
      })
    })
  }

  _filterByName(applications, name) {
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
    return applications
      .where('created_at', '>=', date_of_registration + ' 00:00:00')
      .where('created_at', '<=', date_of_registration + ' 23:59:59')
  }
}

module.exports = ApplicationService
