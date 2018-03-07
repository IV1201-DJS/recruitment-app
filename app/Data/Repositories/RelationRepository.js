'use strict'

const db = use('Database')

/** 
 * Retrieves related instances
 * of models. Uses transactions.
 * 
 * @class RelationRepository
*/
class RelationRepository {
  /**
   * Retrieves the associated user for a Model
   * 
   * @param {Model} instance 
   */
  async fetchRelatedUser(instance) {
    return await this._transaction(() => instance.user())
  }

  /**
   * Retrieves the associated status for a Model
   * 
   * @param {Model} instance 
   */
  async fetchRelatedStatus(instance) {
    return await this._transaction(() => instance.status())
  }

  /**
   * Retrieves the associated availabilities for a Model
   * 
   * @param {Model} instance 
   */
  async fetchRelatedAvailabilities(instance) {
    return await this._transaction(() => instance.availabilities())
  }

  /**
   * Retrieves the associated competences for a Model
   * 
   * @param {Model} instance 
   */
  async fetchRelatedCompetences(instance) {
    return await this._transaction(() => instance.competences())
  }

  /**
   * Retrieves the associated role for a Model
   * 
   * @param {Model} instance 
   */
  async fetchRelatedRole(instance) {
    return await this._transaction(() => instance.role())
  }

  /**
   * Retrieves the associated translation for a Model
   * 
   * @param {Model} instance 
   * @param {Language} language
   */
  async fetchRelatedTranslation(instance, language) {
    const result = await this._transaction(() => { 
      return instance.translations().where('language_id', language.id)
    })
    return result.first().translation
  }

  async _transaction(getRelation) {
    const trx = await db.beginTransaction()
    const instance = await getRelation()
      .transacting(trx)
      .forShare()
      .fetch()
    await trx.commit()
    return instance
  }
}

module.exports = RelationRepository
