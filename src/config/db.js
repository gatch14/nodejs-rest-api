const dbConfig = {
  development: {
    debug: true,
    host: 'localhost',
    port: 27017,
    database: 'rest-api',
    username: 'rest-api',
    password: 'azerty'
  },
  ci: {
    debug: true,
    host: 'localhost',
    port: 27017,
    database: 'rest-api',
    username: 'rest-api',
    password: 'azerty'
  },
  production: {
    debug: true,
    host: 'localhost',
    port: 27017,
    database: 'rest-api',
    username: 'rest-api',
    password: 'azerty'
  }
};

module.exports = dbConfig;
