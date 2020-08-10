const menu = require('../components/menu');
const footer = require('../components/footer');

module.exports = function (app, html) {
  return html`
    <main class="wow">
      ${menu(app, html)}
      
      <div class="container">
        <section class="login">
          <h1>Login to your account</h1>
          <div style="display: none;">
            You are already logged in
          </div>
          
          <div>
            <p>
              Enter your account details to login.
            </p>
            <form class="form">
              <div class="form-error" style="display: none;">
                You have not been logged in:
              </div>

              <div class="form-field">
                <label for="email">Email Address</label>
                <input id="email" type="email" autofocus />
              </div>
            
              <div class="form-field">
                <label for="password">Password</label>
                <input id="password" type="password" />
              </div>
            
              <div class="form-field">
                <button type="login" class="button primary">Login</button>
              </div>
            </form>
          </div>
        </section>
      </div>

      ${footer(app, html)}
    </main>
  `;
};
