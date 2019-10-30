const {fastn} = require('../fastn')

const app = require('../app')

function createRoute(opts) {
  return fastn('a', {
    href: opts.href,
    class: opts.class
  }, opts.title)
  .on('click', app.changeRoute(opts.href))
}

module.exports = createRoute