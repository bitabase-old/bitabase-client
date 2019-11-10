const spath = require('spath')
const onUrlChange = require('on-url-change')

const { mutate } = require('../fastn')

const authModule = require('./auth')
const databasesModule = require('./databases')

const state = {
  errors: {},
  route: window.location.pathname
}

document.addEventListener('click', spath.pushStateAnchors)

onUrlChange()
  .on('change', () => 
    mutate.set(state, 'route', window.location.pathname)
  )

const auth = authModule(state)
auth.sync()

module.exports = {
  state,
  mutate,

  ...auth,
  ...databasesModule(state)
}
