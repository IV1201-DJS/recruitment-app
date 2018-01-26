'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

// Define our schema using the GraphQL schema language
const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
    firstname: String!
    lastname: String!
    ssn: String!
    role: Role!
    availabilities: [Availability]
    competences: [UserCompetence]
  }
  type Role {
    id: ID!
    name: String!
  }
  type Availability {
    user: User
    from: String
    to: String
  }
  type UserCompetence {
    user: User
    competence: Competence
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

  type Query {
    allUsers: [User]
    allRoles: [Role]
    allAvailabilities: [Availability]
    allCompetences: [Competence]
    allUserCompetences: [UserCompetence]
    allLanguages: [Language]
    allCompetenceTranslations: [CompetenceTranslation]
    allRoleTranslations: [RoleTranslation]
    fetchUser(id: ID!): User
  }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })

