<template>
  <v-container>
    <div v-if="CurrentUser">
      <h1>Username: {{ CurrentUser.username }}</h1>
      <h2>First name: {{ CurrentUser.firstname }}</h2>
      <h2>Last name: {{ CurrentUser.lastname }}</h2>
      <h2>Email: {{ CurrentUser.email }}</h2>
    </div>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data: () => ({
    CurrentUser: undefined
  }),
  apollo: {
    // Query with parameters
    CurrentUser: {
      query: gql`query {
        CurrentUser {
          username
          firstname
          lastname
          email
        }
      }`
    }
  }
}
</script>
