module.exports = function (app, html) {
  return html`
    <footer>
      <div class="grid">
        <div>
          <img width="40px" class="logo-icon" src="/img/favicon.png" />
        </div>
        <div>
          <strong>Projects</strong>
          <ul>
            <li><a target="_blank" href="https://github.com/bitabase/bitabase-server">Data Server</a></li>
            <li><a target="_blank" href="https://github.com/bitabase/bitabase-manager">Manager Server</a></li>
            <li><a target="_blank" href="https://github.com/bitabase/bitabase-gateway">Gateway Server</a></li>
          </ul>
        </div>
        <div>
          <strong>Documentation</strong>
          <ul>
            <li><a target="_blank" href="https://docs.bitabase.com">Developer Portal</a></li>
            <li><a target="_blank" href="https://docs.bitabase.com/docs/api/introduction">API Reference</a></li>
          </ul>
        </div>
        <div>
          <strong>Links</strong>
          <ul>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a target="_blank" href="https://github.com/bitabase">Github Profile</a></li>
          </ul>
        </div>
        <div>
          <strong>Legal</strong>
          <ul>
            <li><a href="/cookies">Cookie Policy</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/refunds">Refund Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/delivery">Delivery Policy</a></li>
          </ul>
        </div>
      </div>
      <div class="copyright">
        Copyright Bitabase 2020
      </div>
    </footer>
  `;
};
