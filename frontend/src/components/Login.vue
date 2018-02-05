<template>
  <v-container grid-list-xl mt-5>
    <v-layout row>
      <v-flex sm10 offset-sm1 text-xs-right>
        <v-card>
          <v-toolbar color="indigo" dark>
            <v-toolbar-title v-t="'message.login'" />
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                :label="emailOrUsernameLocale"
                v-model="emailOrUsername"
                :error-messages="errors.collect(emailOrUsernameLocale)"
                v-validate="'required'"
                :data-vv-name="emailOrUsernameLocale"
              />
              <v-text-field
                :label="passwordLocale"
                v-model="password"
                :error-messages="errors.collect(passwordLocale)"
                v-validate="'required|min:6|max:32'"
                :data-vv-name="passwordLocale"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
              />

              <v-btn color="primary" @click="login" v-t="'message.login'" />
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'

export default {
  data: () => ({
    e1: true,
    emailOrUsername: '',
    password: ''
  }),
  filters: {
    lowerCase (data) {
      return data.toLowerCase()
    }
  },
  computed: {
    emailOrUsernameLocale () {
      return this.$t('message.emailOrUsername')
    },
    passwordLocale () {
      return this.$t('user.password')
    }
  },
  methods: {
    async login () {
      try {
        const res = await axios.post('/api/login', {
          username: this.emailOrUsername,
          password: this.password
        })

        const { token } = res.data
        localStorage.setItem('token', token)
      } catch (e) {
        // TODO: show an error message to the user
        console.error(e)
      }
    }
  }
}
</script>
