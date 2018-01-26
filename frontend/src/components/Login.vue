<template>
  <v-container grid-list-xl class="mt-5">
    <v-layout row>
      <v-flex sm10 offset-sm1 elevation-3 text-xs-right>
        <v-form v-model="valid" ref="form">
          <v-text-field
            label="E-mail"
            v-model="email"
            :rules="emailRules"
            required
          />
          <v-text-field
            label="Password"
            v-model="password"
            :rules="passwordRules"
            required
          />

          <v-btn color="primary" @click="login" :disabled="!valid">
            Login
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    valid: false,
    password: '',
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      (v) => !!v || 'Password is required!',
      (v) => v && v.length <= 32 || 'Password must be less than 32 characters'
    ]
  }),
  methods: {
    login () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        // axios.post('/api/submit', {
        //   name: this.name,
        //   email: this.email,
        //   select: this.select,
        //   checkbox: this.checkbox
        // })
      }
    }
  }
}
</script>
