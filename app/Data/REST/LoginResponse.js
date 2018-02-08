'use strict'

class LoginResponse {
  constructor (response, status, data) {
    this.body = response.status(status).json(data)
  }
}

module.exports = LoginResponse