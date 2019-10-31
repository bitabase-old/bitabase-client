const app = require('./app')
const ui = require('./ui')(app)

ui.attach(app.state)
ui.render()

window.addEventListener('DOMContentLoaded', function () {
  document.body.appendChild(ui.element)
})
