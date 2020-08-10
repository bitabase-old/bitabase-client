const menu = require('../../components/menu');
const footer = require('../../components/footer');

module.exports = function (app, html) {
  return html`
    <div>
      <main>
        ${menu(app, html)}
        
        <div class="container">
          <h1>Cookie Policy</h1>

          <p>Cookies are very small text files that are stored on your computer when you visit some websites.</p>

          <p>We use cookies to help identify your computer so we can tailor your user experience, track shopping basket contents and remember where you are in the order process.</p>

          <p>You can disable any cookies already stored on your computer, but these may stop our website from functioning properly.</p>

          <p>The following is strictly necessary in the operation of our website.</p>

          <p>This Website Will:</p>

          <ul>
              <li>Remember what is in your shopping basket</li>
              <li>Remember where you are in the order process</li>
              <li>Remember that you are logged in and that your session is secure.  You need to be logged in to complete an order.</li>
          </ul>

          <p>The following are not Strictly Necessary, but are required to provide you with the best user experience and also to tell us which pages you find most interesting (anonymously).</p>

          <h2>Functional Cookies</h2>

          <p>This Website Will:</p>

          <ul>
              <li>Offer Live Chat Support</li>
              <li>Track the pages you visits via Google Analytics</li>
          </ul>

          <h2>Targeting Cookies</h2>

          <p>This Website Will:</p>

          <ul>
              <li>Allow you to share pages with social networks such as Facebook</li>
              <li>Allow you to share pages via our ShareThis widget</li>
          </ul>

          <p>This website will not:</p>

          <ul>
              <li>Share any personal information with third parties.</li>
          </ul>

        </div>
      </main>

      ${footer(app, html)}
    </div>
  `;
};
