<template>
  <div v-if="CurrentUser">
    <h1>{{ CurrentUser.username }}</h1>
    <h2>{{ CurrentUser.firstname }}</h2>
    <h2>{{ CurrentUser.lastname }}</h2>
    <h2>{{ CurrentUser.email }}</h2>
  </div>
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
