const { mutate } = require('../../fastn')

const setInputFromEvent = (state, field) =>
  event => mutate.set(state, field, event.target.value)

module.exports = setInputFromEvent
