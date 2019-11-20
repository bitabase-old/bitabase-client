const laidout = require('laidout');

function getElementWhenMounted (fn) {
  return function () {
    const element = this.element;
    laidout(element, function () {
      fn(element);
    });
  };
}

module.exports = getElementWhenMounted;
