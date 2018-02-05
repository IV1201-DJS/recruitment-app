'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')
const GraphqlAdonis = use('ApolloServer')
const schema = require('../app/data/schema')
const User = use('App/Models/User')

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/debug', async ({ request }) => {
  const user = await User.query()
        .where({id: 5})
        .with('role')
        .with('availabilities')
        .with('competences')
        .first()
    return user
})

Route.post('/api/login', async ({ request, auth }) => {
  const {
    username,
    password
  } = request.only(['username', 'password'])

  const { token } = await auth.attempt(username, password)

  return {
    token
  }
})

Route.route('/graphql', ({ request, auth, response }) => {
  return GraphqlAdonis.graphql({
    schema,
    context: { auth }
  }, request, response)
}, ['GET', 'POST'])
.middleware(['auth-jwt'])

Route.get('/graphiql', ({ request, response }) => {
  return GraphqlAdonis.graphiql({ endpointURL: '/graphql' }, request, response)
})

