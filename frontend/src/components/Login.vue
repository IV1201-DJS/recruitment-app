<template>
  <v-container grid-list-xl class="mt-5">
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
import gql from 'graphql-tag'

export default {
  data: () => ({
    e1: true,
    emailOrUsername: '',
    password: ''
  }),
  apollo: {
    user () {
      query: gql`{
        fetchUser(id: 1) {
          username
        }
      }`
    }
  },
  mounted () {
    console.log(this.$apollo.user)
  },
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
      // if (this.$refs.form.validate()) {
      // Native form submission is not yet supported
      // axios.post('/api/submit', {
      //   name: this.name,
      //   email: this.email,
      //   select: this.select,
      //   checkbox: this.checkbox
      // })
      // }
    }
  }
}
</script>
