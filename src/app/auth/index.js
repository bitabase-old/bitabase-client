const { mutate } = require('../../fastn')
const axios = require('axios')
const config = require('../../../config')
const getCookies = require('../utils/getCookies')

module.exports = function (state) {
  async function sync () {
    const cookies = getCookies()

    if (cookies.sessionId && cookies.sessionSecret) {
      const result = await axios('/sessions/current', {
        method: 'get',
        headers: {
          'X-Session-Id': cookies.sessionId,
          'X-Session-Secret': cookies.sessionSecret
        },
        baseURL: config.apiServerUrl,
        validateStatus: status => status < 500 && true
      })

      mutate.set(state, 'user', result.data.user)
    }
  }

  async function login ({ email, password }, callback) {
    mutate.remove(state, 'errors.login')

    const result = await axios('/sessions', {
      method: 'post',
      baseURL: config.apiServerUrl,
      validateStatus: status => status < 500 && true,
      data: {
        email,
        password
      }
    })

    if (result.status === 200) {
      mutate.set(state, 'user', result.data.user)

      document.cookie = `sessionId=${result.data.sessionId}`
      document.cookie = `sessionSecret=${result.data.sessionSecret}`

      callback && callback(null)

      return
    }

    if (result.status === 401) {
      mutate.set(state, 'errors.login', ['email and/or password was wrong'])
      callback && callback(state.errors.login)

      return
    }

    mutate.set(state, 'errors.login', (result.data && result.data.errors) || 'Unknown error')
    callback && callback(state.errors.login)
  }

  async function register ({ email, password, confirmPassword }, callback) {
    mutate.remove(state, 'errors.register')

    if (password !== confirmPassword) {
      mutate.set(state, 'errors.register', ['password and confirmPassword must be the same'])
      callback && callback(state.errors.register)
      return
    }

    const result = await axios('/users', {
      method: 'post',
      baseURL: config.apiServerUrl,
      validateStatus: status => status < 500 && true,
      data: {
        email,
        password
      }
    })

    if (result.status === 200) {
      login({ email, password }, callback)

      return
    }

    mutate.set(state, 'errors.login', (result.data && result.data.errors) || 'Unknown error')
    callback && callback(state.errors.login)
  }

  return {
    sync,
    login,
    register
  }
}
