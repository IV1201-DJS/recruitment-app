'use strict'

const Hash = use('Hash')

const UserHook = module.exports = {}

/**
 * Hash using password as a hook.
 * 
 * @param  {Object} userInstance
 */
UserHook.hashPassword = async (userInstance) => {
  if (userInstance.password) {
    userInstance.password = await Hash.make(userInstance.password)
  }
}
