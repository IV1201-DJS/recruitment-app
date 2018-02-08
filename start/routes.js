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
const schema = use('App/Data/GraphQL/schema')
const User = use('App/Models/User')


Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

/**
 * Authenticate the user
 *
 * @returns A token used to authenticate the user via graphql
 */
Route.post('/api/login', 'UserController.login')


/**
 * Create a new user
 *
 * @returns A User object
 */
Route.post('/api/register', 'UserController.store')


/**
 * Transfer an old user to the new system
 *
 * @returns A User object
 */
Route.get('/api/transfer', 'UserController.transfer')

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
