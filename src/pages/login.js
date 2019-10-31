const {fastn} = require('../fastn')
const createHeader = require('../components/header')

function loginPage () {
  return fastn('div',
    createHeader(),

    fastn('main', 
      fastn('section',
        fastn('h1', 'Log in'),
        fastn('form', {class: 'form'},
          fastn('div', {class: 'form-field'},
            fastn('label', { for: 'email' }, 'Email Address'),
            fastn('input', { id: 'email', type: 'email' }),
          ),

          fastn('div', {class: 'form-field'},
            fastn('label', { for: 'password'}, 'Password'),
            fastn('input', { id: 'password', type: 'password' }),
          ),

          fastn('div', {class: 'form-field'},
            fastn('button', {class: 'button'}, 'Login')
          )
        )
      )
  ))
}

module.exports = loginPage
