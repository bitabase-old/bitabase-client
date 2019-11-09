const { mutate } = require('../fastn')

const routeModule = require('./route')
const authModule = require('./auth')

const state = {
  errors: {},
  route: window.location.pathname
}

routeModule({
  defaultRoute: '/how-it-works'
}, route => {
  mutate.set(state, 'errors', {})
  mutate.set(state, 'route', route)
})

const auth = authModule(state)
auth.sync()

module.exports = {
  state,
  mutate,

  ...auth
}
