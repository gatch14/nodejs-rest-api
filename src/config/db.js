const dbConfig = {
  development: {
    debug: true,
    host: 'localhost',
    port: 27017,
    database: 'rest-api',
    username: 'rest-api',
    password: 'azerty'
  },
  test: {
    debug: true,
    host: 'localhost',
    port: 27017,
    database: 'rest-api-test',
    username: 'rest-api',
    password: 'azerty'
  },
  ci: {
    debug: true,
    host: 'localhost',
    port: 27017,
    database: 'rest-api-ci',
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
