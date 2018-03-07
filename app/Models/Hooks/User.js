'use strict'

const Hash = use('Hash')
const Env = use('Env')

const UserHook = module.exports = {}

/**
 * Hash using password as a hook.
 *
 * @param  {Object} userInstance
 */
UserHook.hashPassword = async (userInstance) => {
  if (userInstance.password) {
    if (Env.get('ENVIRONMENT', 'development') === 'development')
      userInstance.password = await Hash.make(userInstance.password, 1)
    else
      userInstance.password = await Hash.make(userInstance.password)
  }
}
