const {fastn, binding, mutate} = require('../fastn')
const createHeader = require('../components/header')

const inputSetter = (state, field) =>
  event => mutate.set(state, field, event.target.value)

function loginPage ({login}) {
  const loginData = {}
  return fastn('div',
    createHeader(),

    fastn('main', 
      fastn('section',
        fastn('div', { class: 'row' },
          fastn('div', { class: 'column-2-3' },
            fastn('h1', 'Login'),
            fastn('form', {class: 'form'},
              fastn('div', {class: 'form-field'},
                fastn('label', { for: 'email' }, 'Email Address'),
                fastn('input', { id: 'email', type: 'email' })
                  .on('change', inputSetter(loginData, 'email'))
              ),

              fastn('div', {class: 'form-field'},
                fastn('label', { for: 'password'}, 'Password'),
                fastn('input', { id: 'password', type: 'password' })
                  .on('change', inputSetter(loginData, 'password'))
              ),

              fastn('div', {class: 'form-field'},
                fastn('button', {class: 'button'}, 'Login')
                  .on('click', (event) => {
                    event.preventDefault()
                    login(loginData)
                  })
              )
            ).attach(loginData)
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
