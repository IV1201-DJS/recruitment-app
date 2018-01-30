<template>
  <v-container grid-list-xl mt-5>
    <v-layout row>
      <v-flex sm10 offset-sm1 text-xs-right>
        <v-card>
          <v-toolbar color="indigo" dark>
            <v-toolbar-title v-t="'message.register'" />
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                :label="firstNameLocale"
                v-model="firstName"
                :error-messages="errors.collect('firstName')"
                v-validate="'required|min:2|max:32'"
                :data-vv-name="firstNameLocale"
              />
              <v-text-field
                :label="lastNameLocale"
                v-model="lastName"
                :error-messages="errors.collect(lastNameLocale)"
                v-validate="'required|min:2|max:32'"
                :data-vv-name="lastNameLocale"
              />
              <v-text-field
                label="E-mail"
                v-model="email"
                :error-messages="errors.collect('email')"
                v-validate="'required|email'"
                data-vv-name="email"
              />

              <v-menu
                lazy
                :close-on-content-click="false"
                v-model="dateOfBirthMenu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  :label="dateOfBirthLocale"
                  v-model="dateOfBirth"
                  :error-messages="errors.collect(dateOfBirthLocale)"
                  v-validate="'required'"
                  prepend-icon="event"
                  readonly
                  :data-vv-name="dateOfBirthLocale"
                />
                <v-date-picker v-model="dateOfBirth" no-title scrollable actions :allowed-dates="allowedDates">
                  <template slot-scope="{ save, cancel }">
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                      <v-btn flat color="primary" @click="save">OK</v-btn>
                    </v-card-actions>
                  </template>
                </v-date-picker>
              </v-menu>

              <v-text-field
                :label="usernameLocale"
                v-model="username"
                :error-messages="errors.collect(usernameLocale)"
                v-validate="'required|min:3|max:32'"
                :data-vv-name="usernameLocale"
              />
              <v-text-field
                :label="passwordLocale"
                v-model="password"
                :error-messages="errors.collect(passwordLocale)"
                v-validate="'required|confirmed|min:6|max:32'"
                :data-vv-name="passwordLocale"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
              />
              <v-text-field
                :label="passwordConfirmationLocale"
                v-model="password_confirmation"
                :error-messages="errors.collect(passwordConfirmationLocale)"
                v-validate="'required|min:6|max:32'"
                data-vv-name="password confirmation"
                :name="passwordConfirmationLocale"
                :append-icon="e2 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e2 = !e2)"
                :type="e2 ? 'password' : 'text'"
              />

              <v-btn color="primary" @click="register" v-t="'message.register'" />
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    e1: true,
    e2: true,
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: null,
    dateOfBirthMenu: false,
    username: '',
    password: '',
    password_confirmation: ''
  }),
  computed: {
    firstNameLocale () {
      return this.$t('user.firstName')
    },
    lastNameLocale () {
      return this.$t('user.lastName')
    },
    dateOfBirthLocale () {
      return this.$t('user.dateOfBirth')
    },
    usernameLocale () {
      return this.$t('user.username')
    },
    passwordLocale () {
      return this.$t('user.password')
    },
    passwordConfirmationLocale () {
      return this.$t('message.passwordConfirmation')
    }
  },
  methods: {
    register () {
      localStorage.locale = 'sv'

      console.log('Register clicked!')
      // Native form submission is not yet supported
      // axios.post('/api/submit', {
      //   name: this.name,
      //   email: this.email,
      //   select: this.select,
      //   checkbox: this.checkbox
      // })
    },
    allowedDates (date) {
      return new Date(date) < new Date()
    }
  }
}
</script>
