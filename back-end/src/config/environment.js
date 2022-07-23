const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const environment = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.HOST,
    logging: false
  },
  test: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.HOST
  },
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.HOST
  }
};
module.exports = environment;
