const { errResponseMsg, successResponseMsg } = require('../../../utils');
const { authResponseMsg } = require('../../../utils/response');

const { userService } = require('../service');

exports.getUser = async (req, res) => {
  const { status, statusCode, message, data } = await userService.findById(
    req.params.userId
  );
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};
exports.resizeProfileImage = async (req, res, next) => {
  const { file, user } = req;
  if (!file) {
    return next();
  }
  const { status, statusCode, message } = await userService.resizeUserImage(
    file,
    user
  );
  if (statusCode === 200) {
    return next();
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.uploadProfileImage = async (req, res) => {
  const { user, file } = req;
  const { status, statusCode, message, data } = await userService.uploadImage(
    user.userId,
    file
  );
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.getUsers = async (req, res) => {
  const { status, statusCode, message, data } = await userService.find(
    req.query
  );
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.createUser = async (req, res) => {
  const { status, statusCode, message, data } = await userService.create(
    req.body
  );
  if (statusCode === 201) {
    return authResponseMsg(res, status, statusCode, message, data);
  }

  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.blockUser = async (req, res) => {
  const { status, statusCode, message, data } = await userService.block(
    req.params.userId
  );
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.unBlockUser = async (req, res) => {
  const { status, statusCode, message, data } = await userService.unBlock(
    req.params.userId
  );
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.deleteUser = async (req, res) => {
  const { status, statusCode, message, data } = await userService.delete(
    req.params.userId
  );
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.updateUser = async (req, res) => {
  const { user, body } = req;
  const { status, statusCode, message, data } =
    await userService.updateUserProfile(user.userId, body);
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};
