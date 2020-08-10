const menu = require('../components/menu');
const footer = require('../components/footer');

module.exports = function (app, html) {
  return html`
    <div>
      <div class="wow">
        <main>
          ${menu(app, html)}
          
          <section class="tutorial">
            <div class="home-tutorial">
              <h1>1) Create your database:</h1>
              <p><strong>URL:</strong></p>
              <p>https://joe-meeting-orange.bitabase.net</p>
              <p><strong>Time remaining:</strong></p>
              <p>59 minutes</p>
              <a href="/tutorial">Start Tutorial</a>

              <h2>What is bitabase?</h2>
              <p>Right now, you have a RESTful database you can create collections on.</p>
            </div>

            <div class="home-tutorial faded">
              <h1>2) Create a notes collection</h1>
              <p>Collections are ways of grouping your data. Let's create one:</p>
            </div>

            <div class="home-tutorial faded">
              <h1>3) Insert a note</h1>
              <p>Collections are ways of grouping your data. Let's create one:</p>
            </div>

            <div class="home-tutorial faded">
              <h1>4) List your notes</h1>
              <p>Collections are ways of grouping your data. Let's create one:</p>
            </div>
          </section>
        </main>
      </div>
      ${footer(app, html)}
    </div>
  `;
};
