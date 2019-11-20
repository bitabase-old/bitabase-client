const { fastn, binding } = require('../../fastn');
const setInputFromEvent = require('./setInputFromEvent');
const getElementWhenMounted = require('../utils/getElementWhenMounted');

function createFormField ({ type, name, title, focus, error, data }) {
  const inputField = fastn('input', {
    id: name,
    type: type,
    disabled: binding('loading')
  })
    .on('change', setInputFromEvent(data, name));

  if (focus) {
    inputField.on('render', getElementWhenMounted(
      (element) => element.focus()
    ));
  }

  return fastn('div', { class: 'form-field' },
    fastn('label', { for: name }, title),
    inputField,
    fastn('div', { display: error, class: 'form-field-error' }, error)
  );
}

module.exports = createFormField;
