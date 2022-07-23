const authController = require('./auth-controller');

module.exports = Object.freeze({
  login: authController.login,
  isLoggedIn: authController.isLoggedIn,
  forgotPassword: authController.forgotPassword,
  resetPassword: authController.resetPassword
});
