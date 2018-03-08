'use strict'

const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Exception = use('Exception')
})
