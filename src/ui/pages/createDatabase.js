const spath = require('spath');
const { fastn, binding, mutate } = require('../../fastn');

const createHeader = require('../components/header');
const createNotLoggedInSection = require('../components/notLoggedInSection');
const createFormField = require('../utils/createFormField');

function submitForm (app, data) {
  return function (event) {
    event.preventDefault();
    mutate.set(data, 'loading', true);

    app.database.createDatabase(data, (error) => {
      mutate.set(data, 'loading', false);

      if (error) {
        document.getElementById('name').focus();
        document.getElementById('name').select();
      } else {
        spath.setPath('/my-account');
      }
    });
  };
}

function createDatabase (app) {
  const databaseData = {};
  return fastn('div',
    createHeader(app),

    fastn('main', { display: binding('user', user => !user) },
      createNotLoggedInSection()
    ),

    fastn('main', { display: binding('user') },
      fastn('section',
        fastn('div', { class: 'row' },
          fastn('div',
            fastn('h1', 'Create a new database'),

            fastn('div',
              fastn('form', { class: 'form' },

                fastn('div', {
                  class: 'form-error',
                  display: binding('errors.createDatabase')
                },
                'The submitted form has errors. Please correct them then try again'
                ).attach(app.state),

                createFormField({
                  type: 'text',
                  name: 'name',
                  title: 'Name',
                  error: binding('errors.createDatabase.name').attach(app.state),
                  focus: true,
                  data: databaseData
                }),

                fastn('div', { class: 'form-field' },
                  fastn('button', {
                    type: 'input',
                    class: 'button',
                    disabled: binding('loading')
                  }, 'Create database')
                    .on('click', submitForm(app, databaseData))
                )
              ).attach(databaseData)
            )
          )
        )
      )
    ));
}

module.exports = createDatabase;
