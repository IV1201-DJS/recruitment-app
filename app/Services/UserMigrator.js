'use strict'

const { validate } = use('Validator')
const User = use('App/Models/User')
const Availability = use('App/Models/Availability')
const LegacyDatabaseHandler = use('App/Services/LegacyDatabaseHandler')

class UserMigrator {
  constructor () {
    this.legacyDB = new LegacyDatabaseHandler()
  }

  async isCompleteUser(userData) {
    const validation = await validate(userData, {
      name: 'required',
      surname: 'required',
      ssn: 'required',
      email: 'required',
      role_id: 'required',
      username: 'required'
    })
    return !validation.fails()
  }

  async migrate (userData) {
    const userMapping = {
      firstname: userData.name,
      lastname: userData.surname,
      ssn: userData.ssn,
      email: userData.email,
      password: userData.password,
      role_id: userData.role_id,
      username: userData.username
    }
    const user = await User.create(userMapping)
    await this.attachCompetences(user, userData)
    await this.saveAvailabilities(user, userData)
  }

  async saveAvailabilities (user, userData) {
    const availabilities = await this.legacyDB.getAvailabilities(userData.person_id)
    const mappedAvailabilities = availabilities.map(a => {
      const availability = new Availability()
      availability.from = a.from_date
      availability.to = a.to_date
      return availability
    })
    console.log('jasvar')
    await user.availabilities().saveMany(mappedAvailabilities)
  }
  
  async attachCompetences (user, userData) {
    const competenceProfiles = await this.legacyDB.getCompetenceProfiles(userData.person_id)
    const competenceLookup = {}
    competenceProfiles.forEach(p => {
      competenceLookup[p.competence_id] = p.years_of_experience
    })
    await user.competences().attach(Object.keys(competenceLookup), row => {
      row.experience_years = competenceLookup[row.competence_id]
    })
  }
}

module.exports = UserMigrator