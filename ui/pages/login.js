const menu = require('../components/menu');
const footer = require('../components/footer');

const setPath = require('spath/setPath');

module.exports = function (app, html) {
  function login (event) {
    event.preventDefault();
    app.state.loginLoading = true;
    app.emitStateChanged();

    app.auth.login({
      email: event.target.querySelector('[name="email"]').value,
      password: event.target.querySelector('[name="password"]').value
    }, function (error, result) {
      app.state.loginLoading = false;
      app.emitStateChanged();

      if (error) {
        if (Object.keys(error)[0] === 'password') {
          document.querySelector('[name="password"]').focus();
          document.querySelector('[name="password"]').select();
        } else {
          document.querySelector('[autofocus]').focus();
          document.querySelector('[autofocus]').select();
        }

        return;
      }

      setPath('/');
    });
  }

  function createErrorField (namespace, fieldKey) {
    if (app.state.errors && app.state.errors[namespace] && app.state.errors[namespace][fieldKey]) {
      return html`
        <div class="form-field-error">${app.state.errors[namespace][fieldKey]}</div>
      `;
    }
  }

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
            <form class="form" onsubmit=${login}>
              ${Array.isArray(app.state.errors.login) ? html`
                <div class="form-error">
                  ${app.state.errors.login.join(', ')}
                </div>
              ` : undefined}

              <div class="form-field">
                <label for="email">Email Address</label>
                ${createErrorField('login', 'email')}
                <input id="email" name="email" type="email" ${'required'} ${app.state.loginLoading && 'disabled'} autofocus />
              </div>
            
              <div class="form-field">
                <label for="password">Password</label>
                ${createErrorField('login', 'password')}
                <input id="password" name="password" type="password" ${'required'} ${app.state.loginLoading && 'disabled'} />
              </div>
            
              <div class="form-field">
                <button id="loginButton" type="submit" class="button primary ${app.state.loginLoading && 'loading'}" ${app.state.loginLoading && 'disabled'}>Login</button>
              </div>
            </form>
          </div>
        </section>
      </div>

      ${footer(app, html)}
    </main>
  `;
};
