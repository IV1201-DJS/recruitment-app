'use strict'

const { trait, test } = use('Test/Suite')('User')
const UserMigrator = use('App/Services/UserMigrator')

trait((suite) => {
  const migrator = new UserMigrator()
  const incompleteLegacyUser = {
    name: 'name',
    surname: 'surname',
    ssn: '123456789',
    email: 'hello@sir.com',
    role_id: 1
  }
  const completeLegacyUser = {
    ...incompleteLegacyUser,
    username: 'username'
  }
  suite.Context.getter('migrator', () => migrator)
  suite.Context.getter('incompleteLegacyUser', () => incompleteLegacyUser)
  suite.Context.getter('completeLegacyUser', () => completeLegacyUser)
})

test('make sure incomplete user is invalidated', async ({ assert, migrator, incompleteLegacyUser, completeLegacyUser }) => {
  const isValidUser = await migrator.isCompleteUser(incompleteLegacyUser)
  assert.equal(isValidUser, false)
})

test('make sure complete user is validated', async ({ assert, migrator, incompleteLegacyUser, completeLegacyUser}) => {
  const isValidUser = await migrator.isCompleteUser(completeLegacyUser)
  assert.equal(isValidUser, true)
})
