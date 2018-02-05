'use strict'

class AuthJwt {
  async handle ({ request, auth }, next) {
    await auth.check()
    await next()
  }
}

module.exports = AuthJwt
