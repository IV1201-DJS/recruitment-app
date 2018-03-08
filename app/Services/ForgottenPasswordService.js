'use strict'

const nodemailer = require('nodemailer')
const passgen = require('generate-password')
const Env = use('Env')
const LegacyDatabaseHandler = use('App/Data/Handlers/LegacyDatabaseHandler')
const UnprocessableException = use('App/Exceptions/REST/UnprocessableException')
const ResourceNotFoundException = use('App/Exceptions/REST/ResourceNotFoundException')
const UnexpectedException = use('App/Exceptions/REST/UnexpectedException')

const {
  EMAIL_NOT_FOUND,
  USERNAME_NOT_FOUND,
  USER_EMAIL_MISSING,
  SSN_NOT_FOUND,
  IDENTIFIERS_MISSING
} = use('App/Exceptions/Codes')

/** 
 * Service for restoring forgotten passwords
 * for legacy users
 * 
 * @class ForgottenPasswordService
*/
class ForgottenPasswordService {
  constructor() {
    this.legacyDB = new LegacyDatabaseHandler()
    this.mailer = this._initMailer()
  }

  /**
   * Attempts to restore a legacy user's password
   * 
   * @param {Object} knownInfo 
   */
  async helpRestoreFrom(knownInfo) {
    const {
      username,
      email,
      ssn
    } = knownInfo

    if (email) {
      await this._tryWithEmail(email)
      return email
    }

    if (username) {
      const email = await this._tryWithUsername(username)
      return this._mask(email)
    }

    if (ssn) {
      const email = await this._tryWithSSN(ssn)
      return this._mask(email)
    }

    throw new UnprocessableException(IDENTIFIERS_MISSING)
  }

  async _tryWithEmail(email) {
    const user = await this.legacyDB.getUserByEmail(email)
    if (!user) {
      throw new ResourceNotFoundException(EMAIL_NOT_FOUND)
    }
    return await this._proceed(user, {email})
  }

  async _tryWithUsername(username) {
    const user = await this.legacyDB.getUserByUsername(username)
    if (!user) {
      throw new ResourceNotFoundException(USERNAME_NOT_FOUND)
    }
    return await this._proceed(user, {username})
  }

  async _tryWithSSN(ssn) {
    const user = await this.legacyDB.getUserBySSN(ssn)
    if (!user) {
      throw new ResourceNotFoundException(SSN_NOT_FOUND)
    }
    return await this._proceed(user, {ssn})
  }

  async _proceed(user, identifier) {
    let password = user.password
    if (!password) {
      password = await this._assignNewPassword(identifier)
    }
    await this._sendEmail(user, password)
    return user.email
  }

  async _assignNewPassword(identifier) {
    const new_password = passgen.generate({ length: 10 })
    await this.legacyDB.replaceUserPassword(identifier, new_password)
    return new_password
  }

  async _sendEmail(user, password) {
    if (!user.email) {
      throw new UnexpectedException(USER_EMAIL_MISSING)
    }
    try {
      const options = this._getMailOptions(user.email, password)
      await this.mailer.sendMail(options)
    } catch(error) {
      throw new UnexpectedException(error)
    }
  }

  _initMailer() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: Env.get('GMAIL_ADDRESS'),
        pass: Env.get('GMAIL_PASSWORD')
      }
     })
  }

  _getMailOptions(email, password) {
    return {
      from: Env.get('GMAIL_ADDRESS'),
      to: email,
      subject: 'Your password to the recruitment website',
      html: `
      <p>Your password to the recruitment website is:</p>
      <pre>${password}</pre>
      `
    }
  }

  _mask(email) {
    const [name, domain] = email.split('@')
    const tease = name.substring(0, 3)
    const stars = '*'.repeat(name.length - 3)
    return `${tease}${stars}@${domain}`
  }
}

module.exports = ForgottenPasswordService
