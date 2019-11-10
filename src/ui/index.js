const { fastn, binding } = require('../fastn')

const loginPage = require('./pages/login')
const registerPage = require('./pages/register')
const howItWorksPage = require('./pages/howItWorks')
const myAccountPage = require('./pages/myAccount')
const notFoundPage = require('./pages/notFound')
const createDatabasePage = require('./pages/createDatabase')

const spath = require('spath')
document.addEventListener('click', spath.pushStateAnchors)

module.exports = function (app) {
  return fastn('templater', {
    data: binding('route'),
    template: function (data) {
      const route = data.get('item')

      switch (route) {
        case '/':
        case '/how-it-works':
          return howItWorksPage(app).attach(app.state)

        case '/login':
          return loginPage(app).attach(app.state)

        case '/register':
          return registerPage(app).attach(app.state)

        case '/my-account':
          return myAccountPage(app).attach(app.state)

        case '/databases/create':
          return createDatabasePage(app).attach(app.state)

        default:
          return notFoundPage(app).attach(app.state)
      }
    }
  })
}
