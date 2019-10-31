const {mutate} = require('../../fastn')

module.exports = function (state) {
  function login ({email, password}, callback) {
    mutate.remove(state, 'errors.login')

    setTimeout(function () {
      if (email === 'yes') {
        mutate.set(state, 'user', {email})
        callback(null)
      } else {
        const errorMessage = 'Your email and password combination did not match any existing user. For this demo, try setting the email to "yes"'
  
        mutate.set(state, 'errors.login', errorMessage)
        callback(errorMessage)
      }
    }, 700)
  }

  return {
    login
  }
}
