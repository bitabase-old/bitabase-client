const {mutate} = require('./fastn')

const routeModule = require('./modules/route')
const authModule = require('./modules/auth')

const state = {
  errors: {},
  route: window.location.pathname
}

const {changeRoute} = routeModule({
  defaultRoute: '/how-it-works'
}, route => {
    mutate.set(state, 'route', route)
})

module.exports = {
  state,
  mutate,

  changeRoute,
  ...authModule(state)
}
