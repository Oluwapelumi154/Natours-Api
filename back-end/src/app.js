const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });
const express = require('express');
const logger = require('morgan');
const compression = require('compression');

const app = express();
const api = require('../gateway');
const { errResponseMsg } = require('../utils');

app.use(express.json());
app.use(compression());
app.use(logger('dev'));
app.use('/api', api);
app.use('*', (req, res) =>
  errResponseMsg(res, 404, `Can't find ${req.originalUrl} on this server`)
);
module.exports = app;
