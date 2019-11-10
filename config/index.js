const config = {
  dev: {
    apiServerUrl: 'http://localhost:8081/v1'
  },

  production: {
    apiServerUrl: 'https://api.bitabase.com'
  }
}

console.log('NODE_ENV', process.env.NODE_ENV)

module.exports = config[process.env.NODE_ENV || 'dev']
