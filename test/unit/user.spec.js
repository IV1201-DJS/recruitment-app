'use strict'

const { trait, test } = use('Test/Suite')('User')
const UserMigrator = use('App/Services/UserMigrator')
const sinon = require('sinon')
const LegacyDBHandler = use('App/Services/LegacyDatabaseHandler')
const Database = use('Database')

trait((suite) => {
  const legacyDBMock = sinon.mock(new LegacyDBHandler())
  const newDBMock = sinon.mock(Database)
  const migrator = new UserMigrator(legacyDBMock, newDBMock)
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
  suite.Context.getter('legacyDBMock', () => legacyDBMock)
  suite.Context.getter('newDBMock', () => newDBMock)
})

test('make sure isCompleteUser() returns false for an incomplete user', async ({ assert, migrator, incompleteLegacyUser, completeLegacyUser }) => {
  const isValidUser = await migrator.isCompleteUser(incompleteLegacyUser)
  assert.equal(isValidUser, false)
})

test('make sure isCompleteUser() returns true for a complete user', async ({ assert, migrator, incompleteLegacyUser, completeLegacyUser}) => {
  const isValidUser = await migrator.isCompleteUser(completeLegacyUser)
  assert.equal(isValidUser, true)
})

// // test('make sure migrate() calls newDB.transaction', async ({ newDBMock, assert, migrator, completeLegacyUser }) => {
// //   const expectation = newDBMock.expects('transaction')
// //   await migrator.migrate(completeLegacyUser)
// //   newDBMock.transaction.verify()
// })

