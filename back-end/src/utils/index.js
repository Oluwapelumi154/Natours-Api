const response = require('./response');
const token = require('./token');
const bcrypt = require('./hash');
const sendEmail = require('./send-mail');
const compareTime = require('./compare-time');
const stripe = require('./stripe');
const sharp = require('./sharp');

module.exports = Object.freeze({
  /** Response */
  authResponseMsg: response.authResponseMsg,
  successResponseMsg: response.successResponseMsg,
  errResponseMsg: response.errResponseMsg,
  serviceResponse: response.serviceResponse,

  /** Token */
  signJWT: token.signJWT,
  verifyJWT: token.verifyJWT,
  hashToken: token.hashToken,
  passwordResetToken: token.passwordResetToken,

  /** Hash */
  hash: bcrypt.hash,
  compare: bcrypt.compare,

  /** Stripe */
  checkOutSession: stripe.checkOutSession,
  sendEmail,
  compareTime: compareTime.compare,

  /** Sharp is tool  used to resize files */
  resize: sharp.resize
});
