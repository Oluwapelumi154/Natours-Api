const router = require('express').Router();

const {
  createUser,
  getUsers,
  getUser,
  blockUser,
  unblockUser,
  deleteUser
} = require('../controller');

const { guard } = require('../../../middleware/guard');

const { isLoggedIn } = require('../../auth/controller');
const { validate } = require('../../../middleware/schema/validate');
const {
  userId,
  userSignUpCredentials
} = require('../../../middleware/schema/schema');

router.post('/signup', validate(userSignUpCredentials()), createUser);

router.get('/all', isLoggedIn, guard.admin, getUsers);

router.get('/:userId', validate(userId()), getUser);

router.patch(
  '/:userId/block',
  validate(userId()),
  isLoggedIn,
  guard.admin,
  blockUser
);

router.patch(
  '/:userId/unblock',
  validate(userId()),
  isLoggedIn,
  guard.admin,
  unblockUser
);

router.delete(
  '/:userId',
  validate(userId()),
  isLoggedIn,
  guard.admin,
  deleteUser
);

module.exports = router;