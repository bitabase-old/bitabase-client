const {fastn, binding} = require('../fastn')
const createRoute = require('./route')

const app = require('../app')

function createMenuItem (menuItem) {
  return fastn('li',
    fastn('a', {
      href: menuItem.get('item').href,
      class: binding('route', 
          route => route.startsWith(menuItem.get('item').href) ? 'active' : ''
        ).attach(app.state)
    }, menuItem.get('item').title)
    .on('click', app.changeRoute(menuItem.get('item').href))
  )
}

module.exports = function () {
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

  return fastn('header', {class: 'site-header'},
    fastn('nav',
      createRoute({
        href: '/',
        class: 'logo',
        title: 'bitabase'
      }),
  
      fastn('ul:list', {
        class: 'left',
        items: menuItems.left,
        template: createMenuItem
      }),
  
      fastn('ul:list', {
        class: 'right',
        items: menuItems.right,
        template: createMenuItem
      })
    )
  )
}
