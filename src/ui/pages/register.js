const { fastn } = require('../../fastn')
const createHeader = require('../components/header')

function registerPage (app) {
  return fastn('div',
    createHeader(app),

    fastn('main',
      fastn('section',
        fastn('h1', 'Create a new account'),
        fastn('div', { class: 'column-6' },
          fastn('form', { class: 'form' },
            fastn('div', { class: 'form-field' },
              fastn('label', { for: 'email' }, 'Email Address'),
              fastn('input', { id: 'email', type: 'email' })
            ),

            fastn('div', { class: 'form-field' },
              fastn('label', { for: 'password' }, 'Password'),
              fastn('input', { id: 'password', type: 'password' })
            ),

            fastn('div', { class: 'form-field' },
              fastn('label', { for: 'confirmPassword' }, 'Confirm Password'),
              fastn('input', { id: 'confirmPassword', type: 'password' })
            ),

            fastn('div', { class: 'form-field' },
              fastn('button', { class: 'button' }, 'Login')
            )
          )
        ),

        fastn('div', { class: 'column-6' },
          fastn('a', { href: '/login' }, 'or login instead')
        )
      )
    ))
}

module.exports = registerPage
