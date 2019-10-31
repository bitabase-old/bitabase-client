const { mutate } = require('./fastn')

const routeModule = require('./modules/route')
const authModule = require('./modules/auth')

const state = {
  errors: {},
  route: window.location.pathname
}

routeModule({
  defaultRoute: '/how-it-works'
}, route => {
  mutate.remove(state, 'errors')
  mutate.set(state, 'route', route)
})

module.exports = {
  state,
  mutate,

  ...authModule(state)
}
