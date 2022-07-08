const {
  getUser,
  getUsers,
  createUser,
  blockUser,
  unblockUser,
  deleteUser
} = require('./user-controller');
module.exports = Object.freeze({
  getUser,
  getUsers,
  createUser,
  blockUser,
  unblockUser,
  deleteUser
});
