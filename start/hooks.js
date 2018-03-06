'use strict'

const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Exception = use('Exception')
  Exception.handle('AppException', async (error, context) => {
    console.log('hello')
    return
  })
})
