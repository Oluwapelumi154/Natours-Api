const router = require('express').Router();
const { login, forgotPassword, resetPassword } = require('../controller');
const { validate } = require('../../../middleware/schema/validate');
const {
  userLoginCredentails,
  passwordUpdateCredentials
} = require('../../../middleware/schema/schema');
const {
  sendMail,
  updatePassword,
  isLoggedIn
} = require('../controller/auth-controller');

router.post('/login', validate(userLoginCredentails()), login);
router.post('/forgotPassword', forgotPassword, sendMail);
router.patch('/resetPassword/:token', resetPassword);
router.patch(
  '/updatePassword',
  isLoggedIn,
  validate(passwordUpdateCredentials()),
  updatePassword
);
module.exports = router;
