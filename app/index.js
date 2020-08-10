const EventEmitter = require('events');
const routemeup = require('routemeup');

const config = require('../config')

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
    const route = routemeup(routes, { url: window.location.pathname });

    state.page = route ? route.controller() : 'notFound';
    state.tokens = route ? route.tokens : {};

    eventEmitter.emit('stateChanged', { force: true });

    document.documentElement.scrollTop = 0;
  }

  function emitStateChanged () {
    eventEmitter.emit('stateChanged');
  }

  return {
    config,

    state,
    emitStateChanged,

    changeUrl,

    on: eventEmitter.addListener.bind(eventEmitter),
    off: eventEmitter.removeListener.bind(eventEmitter)
  };
};
