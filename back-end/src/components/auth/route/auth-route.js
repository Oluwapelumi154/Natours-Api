const router = require('express').Router();
const { login, forgotPassword, resetPassword } = require('../controller');
const { updatePassword, isLoggedIn } = require('../controller/auth-controller');
const { validate } = require('../../../middlewares');
const { userToAuth, userToUpdate } = require('../schema');

/** Auth Routes */
router.post('/login', validate(userToAuth()), login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch(
  '/updatePassword',
  isLoggedIn,
  validate(userToUpdate()),
  updatePassword
);
module.exports = router;
