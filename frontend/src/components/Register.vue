<template>
  <v-container grid-list-xl class="mt-5">
    <v-layout row>
      <v-flex sm10 offset-sm1 text-xs-right>
        <v-card>
          <v-toolbar color="indigo" dark>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                label="First name"
                v-model="firstName"
                :error-messages="errors.collect('firstName')"
                v-validate="'required|min:2|max:32'"
                data-vv-name="firstName"
              />
              <v-text-field
                label="Last name"
                v-model="lastName"
                :error-messages="errors.collect('lastName')"
                v-validate="'required|min:2|max:32'"
                data-vv-name="lastName"
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
                  label="Date of birth"
                  v-model="dateOfBirth"
                  :error-messages="errors.collect('dateOfBirth')"
                  v-validate="'required'"
                  prepend-icon="event"
                  readonly
                  data-vv-name="dateOfBirth"
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
                label="Username"
                v-model="username"
                :error-messages="errors.collect('username')"
                v-validate="'required|min:3|max:32'"
                data-vv-name="username"
              />
              <v-text-field
                label="Password"
                v-model="password"
                :error-messages="errors.collect('password')"
                v-validate="'required|confirmed|min:6|max:32'"
                data-vv-name="password"
              />
              <v-text-field
                label="Password confirmation"
                v-model="password_confirmation"
                :error-messages="errors.collect('password confirmation')"
                v-validate="'required|min:6|max:32'"
                data-vv-name="password confirmation"
                name="password_confirmation"
              />

              <v-btn color="primary" @click="register">
                Register
              </v-btn>
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
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: null,
    dateOfBirthMenu: false,
    username: '',
    password: '',
    password_confirmation: ''
  }),
  methods: {
    register () {
      if (this.$refs.form.validate()) {
        console.log('Register clicked!')
        // Native form submission is not yet supported
        // axios.post('/api/submit', {
        //   name: this.name,
        //   email: this.email,
        //   select: this.select,
        //   checkbox: this.checkbox
        // })
      }
    },
    allowedDates (date) {
      return new Date(date) < new Date()
    }
  }
}
</script>
