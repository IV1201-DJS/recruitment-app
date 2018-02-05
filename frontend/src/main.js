// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VeeValidate from 'vee-validate'
import messagesSv from 'vee-validate/dist/locale/sv'
import VueI18n from 'vue-i18n'

// Apollo
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

import App from './App'
import router from './router'
import store from './store'
import messages from './lang/lang'

Vue.config.productionTip = false

// Default locale
if (!localStorage.locale) {
  localStorage.locale = 'en'
}

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://0.0.0.0:3333/graphql'
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

// Create the apollo client
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

// Install the vue plugin
Vue.use(VueApollo)

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
  apolloProvider,
  components: { App },
  template: '<App/>',
  i18n
})
