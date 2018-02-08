'use strict'

const Model = use('Model')

class Role extends Model {
  /**
   * Retrieves all users with this role
   * 
   * @returns 
   * @memberof Role
   */
  users () {
    return this.hasMany('App/Models/User')
  }

  /**
   * Retrieves all translations for the role
   * 
   * @returns 
   * @memberof Role
   */
  translations () {
    return this.hasMany('App/Models/RoleTranslation')
  }

  async translatedTo (language) {
    const { translation } = await this.translations().where('language_id', language.id).first()
    return translation
  }
}

module.exports = Role
