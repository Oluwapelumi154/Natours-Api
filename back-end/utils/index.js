const {
  serviceResponse,
  successResponseMsg,
  authResponseMsg,
  errResponseMsg
} = require('./response');
const { hash, compare } = require('./hash');
const {
  signJWT,
  verifyJWT,
  passwordResetToken,
  hashToken
} = require('./token');
const sendEmail = require('./send-mail');

module.exports = Object.freeze({
  authResponseMsg,
  compare,
  errResponseMsg,
  hashToken,
  hash,
  passwordResetToken,
  sendEmail,
  serviceResponse,
  signJWT,
  successResponseMsg,
  verifyJWT
});
