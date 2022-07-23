/* eslint-disable prettier/prettier */

const { authService } = require('../service');

const {
  authResponseMsg,
  errResponseMsg,
  successResponseMsg
} = require('../../../utils');

exports.isLoggedIn = async (req, res, next) => {
  const { status, statusCode, message, data } =
    await authService.isAuthenticated(req.headers);
  if (statusCode === 200) {
    req.user = data.dataValues;
    return next();
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.login = async (req, res) => {
  const { status, statusCode, message, data } = await authService.authenticate(
    req.body
  );
  if (statusCode === 200) {
    return authResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { body } = req;
  const { status, statusCode, message, data } =
    await authService.forgotPassword(body.email);
  if (statusCode === 200) {
    // req.user = data;
    // return next();
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, message);
  }
};

// exports.sendMail = async (req, res) => {
//   const { resetToken, user } = req.user;
//   const resetUrl = `${req.protocol}://${req.get(
//     'host'
//   )}/api/auth/resetPassword/${resetToken}`;
//   try {
//     await sendEmail({
//       email: user.dataValues.email,
//       subject: 'The resetToken is only valid for 10minutes',
//       message: resetUrl
//     });
//     return successResponseMsg(
//       res,
//       'success',
//       200,
//       'reset Token has been sent to the email'
//     );
//   } catch (err) {
//     user.resetToken = null;
//     user.resetTokenExp = null;
//     user.save();
//     return successResponseMsg(
//       res,
//       'fail',
//       500,
//       'There was an error sending the email ! Try again later'
//     );
//   }
// };

exports.resetPassword = async (req, res) => {
  const { params, body } = req;
  const { status, statusCode, message, data } = await authService.resetPassword(
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
  const { status, statusCode, message } = await authService.updateUserPassword(
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
