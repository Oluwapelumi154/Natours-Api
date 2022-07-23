const { validate } = require('./validate');
const guard = require('./guard');
const logger = require('./logger');
const upload = require('./upload');

module.exports = Object.freeze({
  validate,
  guard,
  logger,
  uploadUserImage: upload.uploadUserImage,
  uploadTourImage: upload.uploadTourImages
});
