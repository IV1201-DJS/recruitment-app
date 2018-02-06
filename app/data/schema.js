'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')
const fs = require('fs')

// Define our schema using the GraphQL schema language
const typeDefs = fs.readFileSync('app/data/types.gql', { encoding: 'utf8' })

module.exports = makeExecutableSchema({ typeDefs, resolvers })
