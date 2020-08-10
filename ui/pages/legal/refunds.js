const menu = require('../../components/menu');
const footer = require('../../components/footer');

module.exports = function (app, html) {
  return html`
    <div>
      <main>
        ${menu(app, html)}
        
        <div class="container">
          <h1>Refund Policy</h1>
          <h2>Hosted Services</h2>

          <p>Billing for Bitabase hosted services are always taken the month <strong>after</strong> you have received our services.</p>

          <p>All the online subscription based services that Bitabase Ltd host on your behalf are subject to at least a
          30 day trial period. After these 30 days an invoice will be sent showing the amount you would have been charged
          with a discount of 100%. The next billing cycle will not have this 100% applied and the full amount will be due.</p>

          <p>However, if <strong>during</strong> the second month you decide that our services do not suit your business,
          you can raise a support ticket in your customer portal stating you would like to cancel your account. We will
          try and help you get the best out of our services, but ultimately you may close the account in the second month
          and not have to pay for that month.</p>

          <p>Due to the fact we don't charge up front for our services and offer a flexible trial period, once a payment has
          been made we can not offer any refunds.</p>

          <h2>Digital Downloads</h2>

          <p>Payment for Bitabase downloadable products are taken in advanced, meaning you must make payment <strong>before</strong> you
          receive our product.  Under the <a href="http://www.which.co.uk/consumer-rights/regulation/consumer-contracts-regulations/">Consumer Contracts Regulations</a>
          in the UK, once you have downloaded our product we can not process any refunds. When you purchase a digital download from Bitabase Software Ltd
          you have 14 days in which you may claim a refund. However, refunds will only be processed if the product has not been downloaded.</p>

          <p>For these reason, we suggest you follow the checklist below before purchasing:</p>
          <ul>
              <li>Check the technical requirements carefully</li>
              <li>Run the compatibility checker or trial version</li>
              <li>Contact our sales team with any concerns you haveL</li>
          </ul>

        </div>
      </main>

      ${footer(app, html)}
    </div>
  `;
};
