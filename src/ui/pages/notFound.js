const { fastn } = require('../../fastn')
const createHeader = require('../components/header')

function notFoundPage (app) {
  return fastn('div',
    createHeader(app),

    fastn('main',
      fastn('section',
        fastn('h1', 'Not Found'),
        fastn('p', 'Whoops! This page doesn\'t exist.')
      )
    ))
}

module.exports = notFoundPage
