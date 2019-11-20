const { fastn, binding, mutate } = require('../../fastn');
const createHeader = require('../components/header');
const getElementWhenMounted = require('../utils/getElementWhenMounted');
const setInputFromEvent = require('../utils/setInputFromEvent');
const spath = require('spath');

function submitLogin (app, data) {
  return function (event) {
    event.preventDefault();
    mutate.set(data, 'loading', true);

    app.login(data, (error) => {
      mutate.set(data, 'loading', false);

      if (error) {
        document.getElementById('email').focus();
        document.getElementById('email').select();
      } else {
        spath.setPath('/my-account');
      }
    });
  };
}

function createField ({ type, name, title, focus, data }) {
  const inputField = fastn('input', {
    id: name,
    type: type,
    disabled: binding('loading')
  })
    .on('change', setInputFromEvent(data, name));

  if (focus) {
    inputField.on('render', getElementWhenMounted(
      (element) => element.focus()
    ));
  }

  return fastn('div', { class: 'form-field' },
    fastn('label', { for: name }, title),
    inputField
  );
}

function loginPage (app) {
  const loginData = {};
  return fastn('div',
    createHeader(app),

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
                'You have not been logged in:',
                fastn('ul:list', {
                  items: binding('errors.login'),
                  template: () =>
                    fastn('li', binding('item'))
                })
                ).attach(app.state),

                createField({
                  type: 'email',
                  name: 'email',
                  title: 'Email Address',
                  focus: true,
                  data: loginData
                }),

                createField({
                  type: 'password',
                  name: 'password',
                  title: 'Password',
                  data: loginData
                }),

                fastn('div', { class: 'form-field' },
                  fastn('button', {
                    type: 'login',
                    class: 'button',
                    disabled: binding('loading')
                  }, 'Login')
                    .on('click', submitLogin(app, loginData))
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
    ));
}

module.exports = loginPage;
