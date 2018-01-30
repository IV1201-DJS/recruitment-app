<template>
  <v-stepper v-model="e6" vertical>
    <v-stepper-step step="1" v-bind:complete="e6 > 1">
      Validate personal information
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card color="grey lighten-4" flat>
        <v-card-text>
          <v-container fluid>
            <v-text-field
              label="Username"
              :value="User.username"
              disabled
            />

            <v-text-field
              label="First name"
              :value="User.firstname"
              disabled
            />

            <v-text-field
              label="Last name"
              :value="User.lastname"
              disabled
            />

            <v-text-field
              label="Email"
              :value="User.email"
              disabled
            />

            <v-text-field
              label="SSN"
              :value="User.ssn"
              disabled
            />
          </v-container>
        </v-card-text>
      </v-card>

      <v-btn color="primary" @click.native="e6 = 2">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step step="2" v-bind:complete="e6 > 2">Competences</v-stepper-step>

    <v-stepper-content step="2">
      <v-card flat>
        <v-card-text>
          <v-container fluid>
            <v-layout>
              <v-flex>
                <v-select
                  :label="competencesLocale"
                  autocomplete
                  :loading="loading"
                  multiple
                  cache-items
                  chips
                  required
                  :items="items"
                  :rules="[() => select.length > 0 || 'You must choose at least one competence']"
                  :search-input.sync="search"
                  v-model="select"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click.native="e6 = 3">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step step="3" v-bind:complete="e6 > 3">Availability</v-stepper-step>
    <v-stepper-content step="3">
      <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click.native="e6 = 4">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>
<script>
import gql from 'graphql-tag'

export default {
  data () {
    return {
      e6: 1,
      User: {},
      userId: 1,
      loading: false,
      items: [],
      search: null,
      select: [],
      states: [
        'Alabama',
        'Alaska',
        'American Samoa',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'District of Columbia',
        'Federated States of Micronesia',
        'Florida',
        'Georgia',
        'Guam',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Marshall Islands',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Northern Mariana Islands',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Palau',
        'Pennsylvania',
        'Puerto Rico',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virgin Island',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
      ]
    }
  },
  apollo: {
    User: {
      query: gql`query ($id: ID) {
        User (id: $id) {
          username
          firstname
          lastname
          ssn
          email
        }
      }`,
      variables () {
        return {
          id: this.userId
        }
      }
    }
  },
  computed: {
    competencesLocale () {
      return this.$t('user.competences')
    }
  },
  watch: {
    search (val) {
      val && this.querySelections(val)
    }
  },
  methods: {
    querySelections (v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    }
  }
}
</script>
