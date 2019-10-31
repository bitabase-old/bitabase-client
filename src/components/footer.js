const {fastn, binding} = require('../fastn')
const createRoute = require('./route')

module.exports = function () {
  return fastn('footer', {class: 'site-footer'},
    fastn('section',
      fastn('div', 'hello'),
      fastn('div', 'hello'),
      fastn('div', 'hello'),
      fastn('div', 'hello'),
      fastn('div', 'hello'),
      fastn('div', 'hello'),
    )
  )
}
