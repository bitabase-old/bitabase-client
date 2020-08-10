const axios = require('axios');
const getCookies = require('../utils/getCookies');

async function getCollectionsForDatabase (app, cookies, databaseName) {
  const result = await axios(`/databases/${databaseName}/collections`, {
    method: 'get',
    headers: {
      'X-Session-Id': cookies.sessionId,
      'X-Session-Secret': cookies.sessionSecret
    },
    baseURL: app.config.apiServerUrl,
    validateStatus: status => status < 500 && true
  });

  const databaseRecordInState = app.state.databases.find(db => db.name === databaseName);
  result.data.forEach(collection => {
    collection.databaseName = databaseName;
  });
  databaseRecordInState.collections = result.data;
  app.emitStateChanged();
}

module.exports = function (app) {
  const { config, state } = app;

  async function getDatabases () {
    const cookies = getCookies();

    if (cookies.sessionId && cookies.sessionSecret) {
      const result = await axios('/databases', {
        method: 'get',
        headers: {
          'X-Session-Id': cookies.sessionId,
          'X-Session-Secret': cookies.sessionSecret
        },
        baseURL: config.apiServerUrl,
        validateStatus: status => status < 500 && true
      });

      result.data.forEach(db => {
        getCollectionsForDatabase(config, state, cookies, db.name);
      });

      let totalReads = 0;
      let totalWrites = 0;
      result.data.forEach(database => {
        totalReads = totalReads + database.total_reads;
        totalWrites = totalWrites + database.total_writes;
      });

      state.stats = { totalReads, totalWrites };
      state.databases = result.data;

      app.emitStateChanged();
    }
  }

  async function createDatabase (data, callback) {
    const cookies = getCookies();
    delete state.errors.createDatabase;
    app.emitStateChanged();

    const result = await axios('/databases', {
      method: 'post',
      data,
      headers: {
        'X-Session-Id': cookies.sessionId,
        'X-Session-Secret': cookies.sessionSecret
      },
      baseURL: config.apiServerUrl,
      validateStatus: status => status < 500 && true
    });

    if (result.status === 201) {
      callback && callback(null, result.data);
    } else {
      state.errors.createDatabase = (result.data && result.data.errors) || 'Unknown error';
      app.emitStateChanged();
      callback && callback(result.data);
    }
  }

  return {
    ...require('./logs')(state),
    getDatabases,
    createDatabase
  };
};
