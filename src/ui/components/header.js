const { fastn, binding } = require('../../fastn')

const menuItems = {
  left: [{
    href: '/how-it-works',
    title: 'How it works'
  }, {
    href: '/pricing',
    title: 'Pricing'
  }, {
    href: '/support',
    title: 'Support'
  }],

  right: [{
    href: '/login',
    title: 'Login'
  }, {
    href: '/register',
    title: 'Register'
  }]
}

function createMenuItem (app) {
  return function (menuItem) {
    menuItem = menuItem.get('item')
    return fastn('li',
      fastn('a', {
        href: menuItem.href,
        class: binding('route', route =>
          route.startsWith(menuItem.href) ? 'active' : ''
        ).attach(app.state)
      }, menuItem.title)
    )
  }
}

module.exports = function (app) {
  return fastn('header', { class: 'site-header' },
    fastn('nav',
      fastn('a', {
        href: '/',
        class: 'logo'
      }, 'bitabase'),

      fastn('ul:list', {
        class: 'left',
        items: menuItems.left,
        template: createMenuItem(app)
      }),

      fastn('ul:list', {
        class: 'right',
        items: menuItems.right,
        template: createMenuItem(app)
      })
    )
  )
}
