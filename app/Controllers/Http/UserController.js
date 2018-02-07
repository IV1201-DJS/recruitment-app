'use strict'

const { validate } = use('Validator')
const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const rules = {
      username: 'required|unique:users,username',
      password: 'required',
      email: 'required|email|unique:users,email',
      firstname: 'required',
      lastname: 'required',
      ssn: 'required|unique:users,ssn' 
    }

    const userData = request.only(['username', 'password', 'email', 'firstname', 'lastname', 'ssn'])

    const validation = await validate(userData, rules)

    if (validation.fails()) {
      // TODO: Handle validation fail
      return validation.messages()
    }

    return await User.create(userData)
  }

  async login ({ request, auth }) {
    const {
      username,
      password
    } = request.only(['username', 'password'])
  
    const { token } = await auth.attempt(username, password)
  
    return {
      token
    }
  }

}

module.exports = UserController
