const app = require('./app')
const ui = require('./ui')(app)

ui.attach(app.state)
ui.render()

document.body.appendChild(ui.element)
