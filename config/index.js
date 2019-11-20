const config = {
  dev: {
    apiServerUrl: 'http://localhost:8081/v1'
  },

  production: {
    apiServerUrl: 'https://api.bitabase.net/v1'
  }
};

module.exports = config[process.env.NODE_ENV || 'dev'];
