const axios = require('axios');
const getCookies = require('../utils/getCookies');

module.exports = function (app) {
  async function switchLogs (collection) {
    const cookies = getCookies();

    const result = await axios(`/databases/${collection.databaseName}/collections/${collection.name}/logs`, {
      method: 'get',
      headers: {
        'X-Session-Id': cookies.sessionId,
        'X-Session-Secret': cookies.sessionSecret
      },
      baseURL: app.config.apiServerUrl,
      validateStatus: status => status < 500 && true
    });

    app.state.activeLogs = {
      databaseName: collection.databaseName,
      collectionName: collection.collectionName,
      data: result.data
    };

    app.emitStateChanged();
  }

  function clearLogs () {
    app.state.activeLogs = null;
    app.emitStateChanged();
  }

  return {
    switchLogs,
    clearLogs
  };
};
