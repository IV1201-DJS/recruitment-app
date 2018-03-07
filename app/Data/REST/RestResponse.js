'use strict'

class RestResponse {
  constructor (response, status, data) {
    this.body = response.status(status).json(data)
  }
}

module.exports = RestResponse