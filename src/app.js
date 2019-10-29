const {mutate} = require('./fastn')

module.exports = function () {
  const state = {
    test: 'hello'
  }

  return {
    state,

    changeTest: function () {
      mutate.set(state, 'test', 'hello again')
    }
  }
}
