const fastn = require('fastn')({
  text: require('fastn/textComponent'),
  list: require('fastn/listComponent'),
  _generic: require('fastn/genericComponent')
})

module.exports = {
  fastn,
  mutate: fastn.Model,
  binding: fastn.binding
}
