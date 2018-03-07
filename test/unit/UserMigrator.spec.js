'use strict'

const { trait, test } = use('Test/Suite')('UserMigrator')
const sinon = require('sinon')
const bcrypt = require('bcrypt')
const UserMigrator = use('App/Services/UserMigrator')
const LegacyDBHandler = use('App/Services/LegacyDatabaseHandler')
const Database = { transaction: function (trx) {} }

trait((suite) => {
  const legacyDBMock = sinon.mock(new LegacyDBHandler())
  const newDBMock = sinon.mock(Database)
  const migrator = new UserMigrator(legacyDBMock.object, newDBMock.object)

  suite.Context.getter('migrator', () => migrator)
  suite.Context.getter('legacyDBMock', () => legacyDBMock)
  suite.Context.getter('newDBMock', () => newDBMock)
})

test('isCompleteUser returns false for an incomplete user', async ({ assert, migrator }) => {
  const isValidUser = await migrator.isCompleteUser({
    name: 'name',
    surname: 'surname',
    ssn: '123456789',
    email: 'hello@sir.com',
    role_id: 1
  })
  assert.isFalse(isValidUser)
})

test('isCompleteUser returns true for a complete user', async ({ assert, migrator }) => {
  const isValidUser = await migrator.isCompleteUser({
    name: 'name',
    surname: 'surname',
    ssn: '123456789',
    email: 'hello@sir.com',
    role_id: 1,
    username: 'username',
    password: 'somepassword'
  })
  assert.isTrue(isValidUser)
})

test('migrate starts a transaction on the new database', async ({ newDBMock, assert, migrator }) => {
  const expectation = newDBMock
    .expects('transaction')
    .once()

  await migrator.migrate()
  expectation.verify()
})

test('_transactionCallback calls migrateUser, migrateCompetences and migrateAvailabilities', async ({ assert, migrator }) => {
  const transactionCallback = migrator._transactionCallback()
  const migrateUser = sinon.stub(migrator, '_migrateUser')
  const migrateCompetences = sinon.stub(migrator, '_migrateCompetences')
  const migrateAvailabilities = sinon.stub(migrator, '_migrateAvailabilities')
  
  await transactionCallback()
  assert.isTrue(migrateUser.called)
  assert.isTrue(migrateCompetences.called)
  assert.isTrue(migrateAvailabilities.called)
})

test('_getUserMapping maps old -> new user correctly', async ({ assert, migrator }) => {
  const legacyData = {
    name: 'name',
    surname: 'surname',
    ssn: '123456789',
    email: 'hello@sir.com',
    role_id: 1,
    username: 'username',
    password: 'somepassword'
  }
  const expected = {
    firstname: 'name',
    lastname: 'surname',
    ssn: '123456789',
    email: 'hello@sir.com',
    role_id: 1,
    username: 'username',
    password: 'somepassword',
    created_at: '2018-01-01 17:30:00',
    updated_at: '2018-01-01 17:30:00'
  }
  const date = new Date('2018-01-01 17:30')
  const mapping = await migrator._getUserMapping(legacyData, date)

  assert.deepEqual(mapping, expected)
})

test('_migrateUser')

test('_migrateAvailabilities')

test('_migrateCompetences')
