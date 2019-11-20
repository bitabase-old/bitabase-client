const { fastn } = require('../../fastn');
const createHeader = require('../components/header');

function homePage (app) {
  return fastn('div',
    createHeader(app),

    fastn('main',
      fastn('section', { class: 'jumbo' },
        fastn('div', { class: 'container' },
          fastn('h1', 'End-to-End Database'),
          fastn('p', 'Don\'t get stuck in a Data Jam!')
        )
      ),

      fastn('section', { class: 'home-art' },
        fastn('div', { class: 'container' },
          fastn('h2', 'Something good could happen'),
          fastn('p', 'I just know it')
        )
      )
    )
  );
}

module.exports = homePage;
