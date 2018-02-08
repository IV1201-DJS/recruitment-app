'use strict'

const Model = use('Model')
const { createTranslator } = use('App/Services/Translator')

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
    return this.hasMany('App/Model/RoleTranslation')
  }

  async translatedTo (locale) {
    let translator
    try {
      translator = await createTranslator(locale)
    } catch (error) {
      return undefined
    }
    const roleTranslation = await translator.translateRole(this)
    if (roleTranslation) {
      return roleTranslation.translation
    }
    return undefined
  }
}

module.exports = Role
