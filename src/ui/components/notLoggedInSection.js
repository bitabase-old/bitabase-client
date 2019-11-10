const { fastn } = require('../../fastn')

const notLoggedInSection = () =>
  fastn('section',
    fastn('h1', 'Not logged in'),
    fastn('p', 'You need an account to access this page'),
    fastn('ul',
      fastn('li', fastn('a', {href: '/login'}, 'Login')),
      fastn('li', fastn('a', {href: '/register'}, 'Create a new account')),
    )
  )

module.exports = notLoggedInSection
