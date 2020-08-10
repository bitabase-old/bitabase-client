const { mutate } = require('../../fastn');
const axios = require('axios');
const config = require('../../../config');
const getCookies = require('../utils/getCookies');

async function getCollectionsForDatabase (state, cookies, databaseName) {
  const result = await axios(`/databases/${databaseName}/collections`, {
    method: 'get',
    headers: {
      'X-Session-Id': cookies.sessionId,
      'X-Session-Secret': cookies.sessionSecret
    },
    baseURL: config.apiServerUrl,
    validateStatus: status => status < 500 && true
  });

  const databaseRecordInState = state.databases.find(db => db.name === databaseName);
  result.data.forEach(collection => {
    collection.databaseName = databaseName;
  });
  mutate.set(databaseRecordInState, 'collections', result.data);
}

module.exports = function (state) {
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
        getCollectionsForDatabase(state, cookies, db.name);
      });

      let totalReads = 0;
      let totalWrites = 0;
      result.data.forEach(database => {
        totalReads = totalReads + database.total_reads;
        totalWrites = totalWrites + database.total_writes;
      });

      mutate.set(state, 'stats', { totalReads, totalWrites });

      mutate.set(state, 'databases', result.data);
    }
  }

  async function createDatabase (data, callback) {
    const cookies = getCookies();
    mutate.remove(state, 'errors.createDatabase');

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
      mutate.set(state, 'errors.createDatabase',
        (result.data && result.data.errors) || 'Unknown error'
      );
      callback && callback(result.data);
    }
  }

  return {
    ...require('./logs')(state),
    getDatabases,
    createDatabase
  };
};