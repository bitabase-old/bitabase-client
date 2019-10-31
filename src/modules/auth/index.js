module.exports = function (state) {
  function login ({email, password}) {
    console.log('ok', {email, password})
  }

  return {
    login
  }
}
