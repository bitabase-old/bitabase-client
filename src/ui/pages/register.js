const { fastn, binding, mutate } = require('../../fastn')
const createHeader = require('../components/header')
const getElementWhenMounted = require('../utils/getElementWhenMounted')
const setInputFromEvent = require('../utils/setInputFromEvent')
const spath = require('spath')

function submitRegister (app, data) {
  return function (event) {
    event.preventDefault()
    mutate.set(data, 'loading', true)

    app.register(data, (error) => {
      mutate.set(data, 'loading', false)

      if (error) {
        document.getElementById('email').focus()
        document.getElementById('email').select()
      } else {
        spath.setPath('/my-account')
      }
    })
  }
}

function createField ({ type, name, title, focus, data }) {
  const inputField = fastn('input', {
    id: name,
    type: type,
    disabled: binding('loading')
  })
    .on('change', setInputFromEvent(data, name))

  if (focus) {
    inputField.on('render', getElementWhenMounted(
      (element) => element.focus()
    ))
  }

  return fastn('div', { class: 'form-field' },
    fastn('label', { for: name }, title),
    inputField
  )
}

function registerPage (app) {
  const registerData = {}
  return fastn('div',
    createHeader(app),

    fastn('main',
      fastn('section',
        fastn('div', { class: 'row' },
          fastn('div',
            fastn('h1', 'Create a new user'),

            fastn('div', { display: binding('user') },
              'You are already logged in'
            ),

            fastn('div', { display: binding('user', user => !user) },
              fastn('form', { class: 'form' },

                fastn('div', {
                  class: 'form-error',
                  display: binding('errors.register', error => error)
                },
                binding('errors.register')
                ).attach(app.state),

                createField({
                  type: 'email',
                  name: 'email',
                  title: 'Email Address',
                  focus: true,
                  data: registerData
                }),

                createField({
                  type: 'password',
                  name: 'password',
                  title: 'Password',
                  data: registerData
                }),

                createField({
                  type: 'password',
                  name: 'confirmPassword',
                  title: 'Confirm password',
                  data: registerData
                }),

                fastn('div', { class: 'form-field' },
                  fastn('button', {
                    type: 'register',
                    class: 'button',
                    disabled: binding('loading')
                  }, 'Create your account')
                    .on('click', submitRegister(app, registerData))
                )
              ).attach(registerData)
            ),

            fastn('div', { class: 'column-6' },
              fastn('a', { href: '/login' }, 'or login instead')
            )
          )
        )
      )
    ))
}

module.exports = registerPage
