<template>
  <v-container grid-list-xl class="mt-5">
    <v-layout row>
      <v-flex sm10 offset-sm1 text-xs-right>
        <v-card>
          <v-toolbar color="indigo" dark>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                label="E-mail"
                v-model="email"
                :error-messages="errors.collect('email')"
                v-validate="'required|email'"
                data-vv-name="email"
              />
              <v-text-field
                label="Password"
                v-model="password"
                :error-messages="errors.collect('password')"
                v-validate="'required|min:6|max:32'"
                data-vv-name="password"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                class="input-group--focused"
                :type="e1 ? 'password' : 'text'"
              />

              <v-btn color="primary" @click="login">
                Login
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
    e1: true,
    email: '',
    password: ''
  }),
  methods: {
    async login () {
      await this.$validator.validateAll()
      console.log('Login clicked!')

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
