const {fastn} = require('../fastn')
const createHeader = require('../components/header')

function loginPage () {
  return fastn('div',
    createHeader(),

    fastn('main', 
      fastn('section',
        fastn('h1', 'Log in'),
        fastn('p', 'You can do it')
      )
  ))
}

module.exports = loginPage
