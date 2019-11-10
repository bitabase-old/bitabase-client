const { mutate } = require('../../fastn')
const axios = require('axios')
const config = require('../../../config')
const getCookies = require('../utils/getCookies')

module.exports = function (state) {
  async function getDatabases () {
    const cookies = getCookies()

    if (cookies.sessionId && cookies.sessionSecret) {
      const result = await axios('/databases', {
        method: 'get',
        headers: {
          'X-Session-Id': cookies.sessionId,
          'X-Session-Secret': cookies.sessionSecret
        },
        baseURL: config.apiServerUrl,
        validateStatus: status => status < 500 && true
      })

      mutate.set(state, 'databases', result.data)
    }
  }

  return {
    getDatabases
  }
}
