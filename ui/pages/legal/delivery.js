const menu = require('../../components/menu');
const footer = require('../../components/footer');

module.exports = function (app, html) {
  return html`
    <div>
      <main>
        ${menu(app, html)}
        
        <div class="container">
          <h1>Delivery Policy</h1>
          <h2>When will you receive the software</h2>
          <p>As soon as the transaction has been approved by our payment processor you will receive an
          email within 30 minutes containing a link to your software and any license keys required to
          install the software.</p>

          <p>If you have any problems you can contact our sales team on sales@bitabase.com who
          will be able to assist you with the installation.</p>

          <p>Our system automatically delivers the access and information to install your chosen software 
          to your email address, as specified during the registration process. If for any reason you do
          not get the email, please contact us at sales@bitabase.com and a sales representative will be in touch
          within 48 hours to give you the support you need.</p>
        </div>
      </main>

      ${footer(app, html)}
    </div>
  `;
};
