const {
  serviceResponse,
  passwordResetToken,
  hashToken,
  sendEmail
} = require('../../../utils');
const { comparePassword, hash } = require('../../../utils/hash');
const { verifyJWT, signJWT } = require('../../../utils/token');
const { userRepository } = require('../../user/repository');

class authService {
  static async isAuthenticated(headers) {
    try {
      const token = headers['x-auth-token'];
      if (!token) {
        return serviceResponse(
          'fail',
          401,
          'unAuthorized user Login to gain access'
        );
      }
      const payload = verifyJWT(token);
      const user = await userRepository.findById(payload.id);
      if (!user) {
        return serviceResponse('fail', 400, 'Invalid Id');
      }
      return serviceResponse('success', 200, '', user);
    } catch (err) {
      return serviceResponse('fail', 401, err.message);
    }
  }

  static async authenticate(userToAuthenticate) {
    try {
      const user = await userRepository.findByEmail(userToAuthenticate.email);
      if (!user) {
        return serviceResponse('fail', 401, 'Incorrect Email Or Password');
      }
      const { userId, email, password } = user;
      const isValidPassword = await comparePassword(
        userToAuthenticate.password,
        password
      );
      if (!isValidPassword) {
        return serviceResponse('fail', 401, 'Incorrect Email Or Password');
      }
      const token = signJWT(userId, email);
      return serviceResponse('success', 200, 'Successfully Authenticated', {
        token,
        user
      });
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async forgotPassword(userEmail) {
    try {
      const user = await userRepository.findByEmail(userEmail);
      const { resetToken, hashedResetToken } = passwordResetToken();
      if (!user) {
        return serviceResponse('fail', 400, 'Incorrect Email');
      }
      user.update({
        resetToken: hashedResetToken,
        resetTokenExp: Date.now() + 10 * 60 * 1000
      });
      const userData = {
        ...user.dataValues
      };
      const resetUrl = `http://127.0.0.1:8000/api/auth/resetPassword/${resetToken}`;
      await sendEmail({
        email: userData.email,
        subject: 'Your password reset token is only valid for 10minutes',
        message: resetUrl
      });
      return serviceResponse(
        'success',
        200,
        'password reset token has been sent to your email'
      );
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async resetPassword(resetToken, userToReset) {
    try {
      const hashedResetToken = hashToken(resetToken);
      const user = await userRepository.findByToken(hashedResetToken);
      if (!user) {
        return serviceResponse(
          'fail',
          400,
          'reset Token is Invalid or Expired'
        );
      }
      const userData = {
        ...user.dataValues
      };
      userToReset.password = await hash(userToReset.password);
      user.update({
        password: userToReset.password,
        passwordChangedAt: Date.now() - 1000,
        resetToken: null,
        resetTokenExp: null
      });
      const token = signJWT(userData.userId, userData.email);
      return serviceResponse(
        'success',
        200,
        'You have successfully reset your password',
        { token }
      );
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async updateUserPassword(userId, userToUpdate) {
    try {
      const user = await userRepository.findById(userId);
      if (!user) {
        return serviceResponse('fail', 400, 'Invalid Id');
      }
      let isValidPassword;
      if (user) {
        const userData = {
          ...user.dataValues
        };
        isValidPassword = await comparePassword(
          userToUpdate.password,
          userData.password
        );
      }
      if (!isValidPassword) {
        return serviceResponse('fail', 400, 'Incorrect Password');
      }
      userToUpdate.newPassword = await hash(userToUpdate.newPassword);
      user.update({
        password: userToUpdate.newPassword
      });
      return serviceResponse('success', 200, 'Successfully Updated Password');
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }
}
module.exports = authService;
