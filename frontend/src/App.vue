<template>
  <v-app light>
    <navbar v-if="loggedIn" />

    <router-view></router-view>
  </v-app>
</template>
<script>
import Navbar from './components/Navbar'

export default {
  components: { Navbar },
  data () {
    return {
      loggedIn: false
    }
  }
}
</script>
<style lang="sass">
</style>
