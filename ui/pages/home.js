const menu = require('../components/menu');
const footer = require('../components/footer');

module.exports = function (app, html) {
  return html`
    <div>
      <div class="wow">
        <main>
          ${menu(app, html)}
          
          <bb-jumbotron>
            <div>
              <h1>Give your <strong>CRUD</strong> a <strong>REST</strong></h1>

              <p>
                Bitabase is an API as a Service product that allows you to deploy production ready API's with no server management.
              </p>

              <ul>
                <li>
                  Document Store
                </li>

                <li>
                  Schema Validation
                </li>

                <li>
                  Business Logic
                </li>

                <li>
                  Serverless
                </li>
              </ul>
            </div>
          </bb-jumbotron>
        </main>
      </div>
      ${footer(app, html)}
    </div>
  `;
};
