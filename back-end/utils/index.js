const {
  serviceResponse,
  successResponseMsg,
  authResponseMsg,
  errResponseMsg
} = require('./response');
const { hash, comparePassword } = require('./hash');
const {
  signJWT,
  verifyJWT,
  passwordResetToken,
  hashToken,
  setCookie
} = require('./token');
const sendEmail = require('./send-mail');

module.exports = Object.freeze({
  authResponseMsg,
  comparePassword,
  errResponseMsg,
  hashToken,
  setCookie,
  hash,
  passwordResetToken,
  sendEmail,
  serviceResponse,
  signJWT,
  successResponseMsg,
  verifyJWT
});
