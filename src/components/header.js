const {fastn, binding} = require('../fastn')

module.exports = function () {
  const menuItems = {
    left: [{
      href: '#',
      title: 'How it works',
      active: true
    }, {
      href: '#',
      title: 'Pricing'
    }, {
      href: '#',
      title: 'Support'
    }],

    right: [{
      href: '#',
      title: 'Login'
    }, {
      href: '#',
      title: 'Register'
    }]
  }

  return fastn('header', {class: 'site-header'},
    fastn('nav',
      fastn('span', {class:'logo'}, 'bitabase'),
  
      fastn('ul:list', {
        class: 'left',
        items: menuItems.left,
        template: () => fastn('li',
          fastn('a', {
            href: binding('href'),
            class: binding('active', active => active ? 'active' : '')
          }, binding('title'))
        ).binding('item')
      }),
  
      fastn('ul:list', {
        class: 'right',
        items: menuItems.right,
        template: () => fastn('li',
          fastn('a', {
            class: binding('active', active => active ? 'active' : '')
          }, binding('title'))
        ).binding('item')
      })
    )
  )
}
