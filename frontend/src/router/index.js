import Vue from 'vue'
import Router from 'vue-router'
import JobApplication from '@/components/JobApplication'
import Login from '@/components/Login'
import Register from '@/components/Register'
import SearchApplication from '@/components/SearchApplication'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'JobApplication',
      component: JobApplication
    },
    {
      path: '/search',
      name: 'SearchApplication',
      component: SearchApplication
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
