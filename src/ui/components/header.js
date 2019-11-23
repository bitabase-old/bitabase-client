const { fastn, binding } = require('../../fastn');

const menuItems = (app) => ({
  left: [{
    href: '/how-it-works',
    title: 'How it works'
  }, {
    href: '/pricing',
    title: 'Pricing'
  }, {
    href: 'https://community.bitabase.com/',
    title: 'Community'
  }, {
    href: 'https://docs.bitabase.com',
    title: 'Documentation'
  }],

  notLoggedIn: [{
    href: '/login',
    title: 'Login'
  }, {
    href: '/register',
    title: 'Register'
  }],

  loggedIn: app.state.user && [{
    href: '/my-account',
    title: app.state.user.email
  }]
});

function createMenuItem (app) {
  return function (menuItem) {
    menuItem = menuItem.get('item');
    return fastn('li',
      fastn('a', {
        href: menuItem.href,
        class: binding('route', route =>
          route.startsWith(menuItem.href) ? 'active' : ''
        ).attach(app.state)
      }, menuItem.title)
    );
  };
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
        items: menuItems(app).left,
        template: createMenuItem(app)
      }),

      fastn('templater', {
        data: binding('user'),
        template: (user) => {
          return fastn('ul:list', {
            class: 'right',
            items: user.get('item') ? menuItems(app).loggedIn : menuItems(app).notLoggedIn,
            template: createMenuItem(app)
          });
        }
      })
    ),

    fastn('div', {
      class: 'alpha-warning'
    }, fastn('div', 'Bitabase is currently in the very early stages of development. It has not reached alpha stage yet. Most endpoints have not been implemented, but features are rapidly being added. Check back frequently for more information.'))

  );
};
