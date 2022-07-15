/* eslint-disable prettier/prettier */

const { userService } = require('../../user/service');

const {
  authResponseMsg,
  errResponseMsg,
  sendEmail,
  setCookie,
  successResponseMsg,
  verifyJWT
} = require('../../../utils');

exports.isLoggedIn = async (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!token) {
    return errResponseMsg(
      res,
      'fail',
      401,
      'UnAuthorized user! Login to gain access'
    );
  }

  // Handle TokenExpiration Error

  process.on('unhandledRejection', (err) => {
    if (err.name === 'TokenExpiredError') {
      return errResponseMsg(
        res,
        'fail',
        401,
        'Acess Token is Expired ! Login to gain access'
      );
    }
  });

  /**
   * Token Verification
   */
  const decoded = await verifyJWT(token);

  /**
   *  Check to know if the user exist
   */
  const { status, statusCode, message, data } = await userService.findById(
    decoded.id
  );
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }

  /**
   *  Check to know if user changed password after token was issued
   */
  const { passwordChangedAt } = data.dataValues;

  const user = userService.changedPasswordAfter(decoded.iat, passwordChangedAt);
  if (user) {
    return errResponseMsg(
      res,
      'fail',
      401,
      'user recently changed password! Login to gain access'
    );
  }
  req.user = data.dataValues;
  next();
};

exports.login = async (req, res) => {
  const { status, statusCode, message, data } = await userService.authenticate(
    req.body
  );
  if (statusCode === 200) {
    setCookie(res, data.token);
    return authResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { status, statusCode, message, data } =
    await userService.forgotPassword(req.body);
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
  req.user = data;

  next();
};
exports.sendMail = async (req, res) => {
  const { resetToken, user } = req.user;
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/auth/resetPassword/${resetToken}`;
  try {
    await sendEmail({
      email: user.dataValues.email,
      subject: 'The resetToken is only valid for 10minutes',
      message: resetUrl
    });
    return successResponseMsg(
      res,
      'success',
      200,
      'reset Token has been sent to the email'
    );
  } catch (err) {
    user.resetToken = null;
    user.resetTokenExp = null;
    user.save();
    return successResponseMsg(
      res,
      'fail',
      500,
      'There was an error sending the email ! Try again later'
    );
  }
};
exports.resetPassword = async (req, res) => {
  const { params, body } = req;
  const { status, statusCode, message, data } = await userService.findByToken(
    params.token,
    body
  );
  if (statusCode === 200) {
    return authResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.updatePassword = async (req, res) => {
  const { body, user } = req;
  const { status, statusCode, message } = await userService.updateUserPassword(
    user.userId,
    body
  );
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.logOut = async (req, res) => {};
