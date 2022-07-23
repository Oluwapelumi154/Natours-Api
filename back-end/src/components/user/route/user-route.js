const router = require('express').Router();
const { isLoggedIn } = require('../../auth/controller');
const { userToCreate, userToUpdate, userId } = require('../schema');
const { validate, uploadUserImage, guard } = require('../../../middlewares');

const {
  blockUser,
  createUser,
  deleteUser,
  getUser,
  getUsers,
  unBlockUser,
  updateUser,
  uploadProfileImage,
  resizeProfileImage
} = require('../controller');

/** User Routes */
router.post('/signup', validate(userToCreate()), createUser);
router.get('/all', isLoggedIn, getUsers);
router.post(
  '/profileImage',
  isLoggedIn,
  uploadUserImage,
  resizeProfileImage,
  uploadProfileImage
);
router.get('/:userId', validate(userId()), getUser);
router.patch('/updateProfile', isLoggedIn, updateUser);

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
  unBlockUser
);

router.delete(
  '/:userId',
  validate(userId()),
  isLoggedIn,
  guard.admin,
  deleteUser
);

module.exports = router;
