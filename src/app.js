const {mutate} = require('./fastn')
const routeModule = require('./modules/route')

const state = {
  route: window.location.pathname,
  test: 'hello'
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

  changeTest: function () {
    mutate.set(state, 'test', 'hello again')
  }
}
