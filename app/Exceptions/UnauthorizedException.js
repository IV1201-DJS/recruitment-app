'use strict'

class UnauthorizedException {
  constructor () {
    this.error = 'You are not authorized to do this'
  }
}

module.exports = UnauthorizedException
