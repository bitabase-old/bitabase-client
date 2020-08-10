const axios = require('axios');
const getCookies = require('../utils/getCookies');

module.exports = function (app) {
  const { state, config } = app;

  async function sync () {
    const cookies = getCookies();

    if (cookies.sessionId && cookies.sessionSecret) {
      const result = await axios('/sessions/current', {
        method: 'get',
        headers: {
          'X-Session-Id': cookies.sessionId,
          'X-Session-Secret': cookies.sessionSecret
        },
        baseURL: config.apiServerUrl,
        validateStatus: status => status < 500 && true
      });

      state.user = result.data.user;
      state.session = {
        sessionId: cookies.sessionId,
        sessionSecret: cookies.sessionSecret
      };

      app.emitStateChanged();
    }
  }

  async function login ({ email, password }, callback) {
    delete state.errors.login;
    app.emitStateChanged();

    document.cookie = 'sessionId=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'sessionSecret=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    const result = await axios('/sessions', {
      method: 'post',
      baseURL: config.apiServerUrl,
      validateStatus: () => true,
      data: {
        email,
        password
      }
    }).catch(error => {
      console.log(error);
      return {
        status: 500,
        data: {
          errors: ['Could not connect to server']
        }
      };
    });

    if (result.status === 200) {
      state.user = result.data.user;
      state.session = {
        sessionId: result.data.sessionId,
        sessionSecret: result.data.sessionSecret
      };
      app.emitStateChanged();

      document.cookie = `sessionId=${result.data.sessionId}`;
      document.cookie = `sessionSecret=${result.data.sessionSecret}`;

      callback && callback(null);

      return;
    }

    if (result.status === 401) {
      state.errors.login = ['email and/or password was wrong'];
      app.emitStateChanged();
      callback && callback(state.errors.login);

      return;
    }

    if (result.status === 422) {
      state.errors.login = result.data.errors;
      app.emitStateChanged();
      callback && callback(state.errors.login);

      return;
    }

    state.errors.login = (result.data && result.data.errors) || 'Unknown error';
    app.emitStateChanged();

    callback && callback(state.errors.login);
  }

  async function register ({ email, password, confirmPassword }, callback) {
    delete state.errors.register;

    document.cookie = 'sessionId=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'sessionSecret=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    if (password !== confirmPassword) {
      state.errors.register = ['password and confirmPassword must be the same'];
      app.emitStateChanged();
      callback && callback(state.errors.register);
      return;
    }

    const result = await axios('/users', {
      method: 'post',
      baseURL: config.apiServerUrl,
      validateStatus: status => status < 500 && true,
      data: {
        email,
        password
      }
    });

    if (result.status === 200) {
      login({ email, password }, callback);

      return;
    }

    state.errors.login = (result.data && result.data.errors) || 'Unknown error';
    callback && callback(state.errors.login);
  }

  return {
    sync,
    login,
    register
  };
};
