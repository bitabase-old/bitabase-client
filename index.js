const config = require('./config');
const app = require('./app')(config);

document.addEventListener('DOMContentLoaded', function () {
  require('./ui')(app, document.body);
  if (process.env.NODE_ENV === 'development') {
    window.app = app;
  }
});
