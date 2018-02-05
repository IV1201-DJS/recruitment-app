'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

// Define our schema using the GraphQL schema language
const typeDefs = `
  type User {
    id: ID
    username: String
    email: String
    firstname: String
    lastname: String
    ssn: String
    role: Role
    availabilities: [Availability]
    competences: [UserCompetence]
  }
  type Role {
    id: ID
    name: String
  }
  type Availability {
    user: User
    from: String
    to: String
  }
  type UserCompetence {
    id: ID
    name: String
    experience_years: Float
  }
  type Competence {
    id: ID
    name: String
  }
  type RoleTranslation {
    role: Role
    language: Language
    translation: String
  }
  type CompetenceTranslation {
    competence: Competence
    language: Language
    translation: String
  }
  type Language {
    id: ID
    name: String
  }
  type Period {
    from: String
    to: String
  }
  type Query {
    User(id: ID): User
    Applications(competence_id: ID): [User]
    Competences(name: String): [Competence]
    CurrentUser: User
  }
  type Mutation {
    createUser(username: String!, password: String!, email: String!, firstname: String!, lastname: String!, ssn: String!): User
  }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
