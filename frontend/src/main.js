// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VeeValidate from 'vee-validate'
import messagesSv from 'vee-validate/dist/locale/sv'
import VueI18n from 'vue-i18n'

import App from './App'
import router from './router'
import store from './store'
import messages from './lang/lang'

Vue.config.productionTip = false

// Default locale
if (!localStorage.locale) {
  localStorage.locale = 'en'
}

Vue.use(Vuetify)
Vue.use(VeeValidate, {
  locale: localStorage.locale,
  dictionary: {
    sv: messagesSv
  }
})
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: localStorage.locale,
  fallbackLocale: 'en',
  messages
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  i18n
})
