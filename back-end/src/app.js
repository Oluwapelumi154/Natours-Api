const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });
const express = require('express');
const logger = require('morgan');
const compression = require('compression');

const helmet = require('helmet');

const app = express();
const api = require('../gateway');
const { errResponseMsg } = require('../utils');

app.use(helmet());
app.use(express.json());
app.use(compression());
app.use(logger('dev'));
app.use('/api', api);
app.use('*', (req, res) =>
  errResponseMsg(res, 404, `Can't find ${req.originalUrl} on this server`)
);
app.use((err, req, res, next) => {
  console.log(err.stack);
});
module.exports = app;
