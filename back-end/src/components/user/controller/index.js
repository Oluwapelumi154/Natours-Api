const userController = require('./user-controller');

module.exports = Object.freeze({
  blockUser: userController.blockUser,
  createUser: userController.createUser,
  deleteUser: userController.deleteUser,
  getUser: userController.getUser,
  getUsers: userController.getUsers,
  resizeUserProfileImage: userController.resizeProfileImage,
  unBlockUser: userController.unBlockUser,
  updateUser: userController.updateUser,
  resizeProfileImage: userController.resizeProfileImage,
  uploadProfileImage: userController.uploadProfileImage
});
