const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });
const { DB_NAME, DB_PASSWORD, DB_USERNAME, DB_DIALECT, HOST } = process.env;

const environment = {
  development: {
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: DB_DIALECT || 'mysql',
    host: HOST
  },
  test: {
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: DB_DIALECT || 'mysql',
    host: HOST
  },
  production: {
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: DB_DIALECT || 'mysql',
    host: HOST
  }
};

module.exports = environment;
