'use strict'

const Model = use('Model')

/**
 * Represents a user of the application
 * 
 * @class User
 */
class User extends Model {
  /**
   * Retrieves a query for all associated availabilities
   *
   * @returns {HasMany}
   */
  availabilities () {
    return this.hasMany('App/Models/Availability')
  }

  /**
   * Retrieves a query for all competences of this user
   *
   * @returns {HasMany}
   */
  competences () {
    return this
      .belongsToMany('App/Models/Competence')
      .withPivot(['experience_years'])
  }

  /**
   * Retrieves a query for all associated applications
   * 
   * @returns {HasMany}
   */
  applications () {
    return this.hasMany('App/Models/Application')
  }

  /**
   * Retrieves a query for the user's role
   *
   * @returns {BelongsTo}
   */
  role () {
    return this.belongsTo('App/Models/Role')
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @returns {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  /**
   * Determines if this user has a pending application
   * 
   * @param {Transaction} trx 
   */
  async hasPendingApplication (trx) {
    const pending = await this.applications()
    .transacting(trx)
    .forShare()
    .doesntHave('status')
    .fetch()

    return pending.toJSON().length != 0
  }

  static get hidden () {
    return ['password']
  }

  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'User.hashPassword')
    this.addHook('beforeCreate', async (userInstance) => {
      userInstance.role_id = userInstance.role_id || 2
    })
  }
}

module.exports = User
