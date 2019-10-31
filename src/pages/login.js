const predator = require('predator')

const { fastn, binding, mutate } = require('../fastn')
const createHeader = require('../components/header')

const inputSetter = (state, field) =>
  event => mutate.set(state, field, event.target.value)

function getElementWhenMounted (fn) {
  return function () {
    const timer = setInterval(() => {
      if (!predator(this.element).hidden) {
        fn(this.element)
        clearTimeout(timer)
      }
    }, 100)
  }
}

function loginPage ({ login, state }) {
  const loginData = {}
  return fastn('div',
    createHeader(),

    fastn('main',
      fastn('section',
        fastn('div', { class: 'row' },
          fastn('div', { class: 'column-2-3' },
            fastn('h1', 'Login'),

            fastn('div', { display: binding('user') },
              'You are already logged in'
            ),

            fastn('div', { display: binding('user', user => !user) },
              fastn('form', { class: 'form' },

                fastn('div', {
                  class: 'form-error',
                  display: binding('errors.login', error => error)
                },
                binding('errors.login')
                ).attach(state),

                fastn('div', { class: 'form-field' },
                  fastn('label', { for: 'email' }, 'Email Address'),
                  fastn('input', {
                    id: 'email', 
                    type: 'email',
                    disabled: binding('loading')
                  })
                    .on('change', inputSetter(loginData, 'email'))
                    .on('render', getElementWhenMounted(
                      (element) => element.focus()
                    ))
                ),

                fastn('div', { class: 'form-field' },
                  fastn('label', { for: 'password' }, 'Password'),
                  fastn('input', {
                    id: 'password', 
                    type: 'password',
                    disabled: binding('loading')
                  })
                    .on('change', inputSetter(loginData, 'password'))
                ),

                fastn('div', { class: 'form-field' },
                  fastn('button', {
                    type: 'login',
                    class: 'button',
                    disabled: binding('loading')
                  }, 'Login')
                    .on('click', (event) => {
                      event.preventDefault()
                      mutate(loginData, 'loading', true)

                      login(loginData, (err) => {
                        mutate(loginData, 'loading', false)

                        if (err) {
                          document.getElementById('email').focus()
                          document.getElementById('email').select()
                        }
                      })
                    })
                )
              ).attach(loginData)
            )
          ),

          fastn('div', { class: 'column-1-3 pad-10' },
            fastn('h1', '...or register instead'),
            fastn('p', 'Sign up for a free trial account, with over 10k reads and 1k writes a month.'),
            fastn('p', 'You can upgrade your plan at any time, or pay a simple fixed pricing pay as you go scheme.'),
            fastn('a', { href: '/register', class: 'button' }, 'Sign up for a free account!')
          )
        )
      )
    ))
}

module.exports = loginPage
