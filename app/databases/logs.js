const { mutate } = require('../../fastn');
const axios = require('axios');
const config = require('../../../config');
const getCookies = require('../utils/getCookies');

module.exports = function (state) {
  async function switchLogs (collection) {
    const cookies = getCookies();

    const result = await axios(`/databases/${collection.databaseName}/collections/${collection.name}/logs`, {
      method: 'get',
      headers: {
        'X-Session-Id': cookies.sessionId,
        'X-Session-Secret': cookies.sessionSecret
      },
      baseURL: config.apiServerUrl,
      validateStatus: status => status < 500 && true
    });

    mutate.set(state, 'activeLogs', {
      databaseName: collection.databaseName,
      collectionName: collection.collectionName,
      data: result.data
    });
  }

  function clearLogs () {
    mutate.set(state, 'activeLogs', null);
  }

  return {
    switchLogs,
    clearLogs
  };
};
