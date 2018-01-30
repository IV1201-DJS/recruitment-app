'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')
const Role = use('App/Models/Role')
const Competence = use('App/Models/Competence')
const Hash = use('Hash')

Factory.blueprint('App/Models/Role', (faker) => {
  return {
    name: faker.profession() + faker.integer({min: 1, max: 1000})
  }
})

Factory.blueprint('App/Models/Competence', (faker) => {
  return {
    name: faker.animal() + faker.integer({min: 1, max: 1000})
  }
})

Factory.blueprint('App/Models/User', (faker) => {
  const role_id = faker.integer({min: 1, max: 10})
  const randInt = faker.integer({min: 1, max: 1000000000})

  return {
    username: faker.username() + randInt,
    email: randInt + faker.email(),
    password: 'hej123',
    firstname: faker.first(),
    lastname: faker.last(),
    ssn: randInt + ':' + faker.birthday({string: true, american: false}).replace(/\//, '') + '-' + faker.ssn({ssnfour: true}),
    role_id
  }
})

Factory.blueprint('App/Models/Availability', (faker) => {
  return {
    user_id: faker.integer({min: 1, max: 10}),
    from: faker.date({year: 2017}),
    to: faker.date({year: 2018})
  }

})
