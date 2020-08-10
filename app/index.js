const EventEmitter = require('events');
const routemeup = require('routemeup');

const authModule = require('./auth');
const databasesModule = require('./databases');

const routes = {
  '/': () => 'home',
  '/tutorial': () => 'tutorial',
  '/cookies': () => 'cookies',
  '/privacy': () => 'privacy',
  '/delivery': () => 'delivery',
  '/refunds': () => 'refunds',
  '/terms': () => 'terms',
  '/login': () => 'login',
  '/join': () => 'join'
};

module.exports = function (config) {
  const eventEmitter = new EventEmitter();

  const state = {};

  function changeUrl () {
    state.errors = {};

    const route = routemeup(routes, { url: window.location.pathname });

    state.page = route ? route.controller() : 'notFound';
    state.tokens = route ? route.tokens : {};

    eventEmitter.emit('stateChanged', { force: true });

    document.documentElement.scrollTop = 0;
  }

  function emitStateChanged () {
    eventEmitter.emit('stateChanged');
  }

  const app = {
    config,

    state,
    emitStateChanged,

    changeUrl,

    loading: 0,

    on: eventEmitter.addListener.bind(eventEmitter),
    off: eventEmitter.removeListener.bind(eventEmitter)
  };

  app.database = databasesModule(app);
  app.auth = authModule(app);
  app.auth.sync();

  return app;
};
