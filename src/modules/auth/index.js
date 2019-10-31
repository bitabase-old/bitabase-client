const {mutate} = require('../../fastn')

module.exports = function (state) {
  function login ({email, password}, callback) {
    mutate.remove(state, 'errors.login')

    setTimeout(function () {
      if (email === 'yes') {
        mutate.set(state, 'user', {email})
        callback(null)
      } else {
        const errorMessage = 'Your email and password combination did not match any existing user'
  
        console.log('Will try and login with', email, password)
  
        mutate.set(state, 'errors.login', errorMessage)
        callback(errorMessage)
      }
    }, 700)
  }

  return {
    login
  }
}
