const {
  login,
  isLoggedIn,
  forgotPassword,
  resetPassword
} = require('./auth-controller');

module.exports = Object.freeze({
  login,
  isLoggedIn,
  forgotPassword,
  resetPassword
});
