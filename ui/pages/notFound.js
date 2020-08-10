const menu = require('../components/menu');
const footer = require('../components/footer');

module.exports = function (app, html) {
  return html`
    <main>
      ${menu(app, html)}
      
      <div class="container">
        <section>
          <h1>Not Found</h1>
          <p>The requested page could not be found.</p>
        </section>
      </div>

      ${footer(app, html)}
    </main>
  `;
};
