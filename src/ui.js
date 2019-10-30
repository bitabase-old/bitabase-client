const {fastn, binding} = require('./fastn')

const loginPage = require('./pages/login')
const howItWorksPage = require('./pages/howItWorks')
const notFoundPage = require('./pages/notFound')

module.exports = function (app) {
  return fastn('templater', {
    data: binding('route'),
    template: function (data){
      const route = data.get('item')

      switch (route) {
        case '/':
        case '/how-it-works':
          return howItWorksPage()

        case '/login':
          return loginPage()

        default:
          return notFoundPage()
      }
    }
  })
}
