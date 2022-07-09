const {
  getUser,
  getUsers,
  createUser,
  blockUser,
  unblockUser,
  deleteUser,
  updateUserProfile
} = require('./user-controller');

module.exports = Object.freeze({
  getUser,
  getUsers,
  createUser,
  blockUser,
  unblockUser,
  deleteUser,
  updateUserProfile
});
