const menu = require('../components/menu');
const footer = require('../components/footer');
const setPath = require('spath/setPath');

module.exports = function (app, html) {
  function register (event) {
    event.preventDefault();
    app.state.joinLoading = true;
    app.emitStateChanged();

    app.auth.register({
      email: event.target.querySelector('[name="email"]').value,
      password: event.target.querySelector('[name="password"]').value,
      confirmPassword: event.target.querySelector('[name="confirmPassword"]').value
    }, function (error, result) {
      app.state.registerLoading = false;
      app.emitStateChanged();

      if (error) {
        if (Array.isArray(error)) {
          document.querySelector('[autofocus]').focus();
          document.querySelector('[autofocus]').select();
        } else {
          document.querySelector(`[name="${Object.keys(error)[0]}"]`).focus();
          document.querySelector(`[name="${Object.keys(error)[0]}"]`).select();
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
          <h1>Create your free account</h1>
          <div style="display: none;">
            You are already logged in
          </div>
          
          <div>
            <p>
              Complete the small form below to create your free account.
            </p>
            <form class="form" onsubmit=${register}>
              ${Array.isArray(app.state.errors.register) ? html`
                <div class="form-error">
                  ${app.state.errors.register.join(', ')}
                </div>
              ` : undefined}

              <div class="form-field">
                <label for="email">Email Address</label>
                ${createErrorField('register', 'email')}
                <input id="email" name="email" type="email" ${'required'} ${app.state.registerLoading && 'disabled'} autofocus />
              </div>
            
              <div class="form-field">
                <label for="password">Password</label>
                ${createErrorField('register', 'password')}
                <input id="password" name="password" type="password" ${'required'} ${app.state.registerLoading && 'disabled'} />
              </div>

              <div class="form-field">
                <label for="confirmPassword">Confirm Password</label>
                ${createErrorField('register', 'confirmPassword')}
                <input id="confirmPassword" name="confirmPassword" type="password" ${'required'} ${app.state.registerLoading && 'disabled'} />
              </div>
            
              <div class="form-field">
                <button id="registerButton" type="submit" class="button primary ${app.state.registerLoading && 'loading'}" ${app.state.registerLoading && 'disabled'}>Create Account</button>
              </div>
            </form>
          </div>
        </section>
      </div>

      ${footer(app, html)}
    </main>
  `;
};
