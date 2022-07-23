const {
  serviceResponse,
  passwordResetToken,
  hashToken,
  sendEmail,
  compareTime,
  compare,
  hash,
  verifyJWT,
  signJWT
} = require('../../../utils');

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
        return serviceResponse(
          'fail',
          400,
          'unAuthorized user Login to gain access'
        );
      }
      const changedPasswordAfter = compareTime(
        payload.iat,
        user.passwordChangedAt
      );
      if (changedPasswordAfter) {
        return serviceResponse(
          'fail',
          401,
          'user recently changed password login to gain access'
        );
      }
      return serviceResponse('success', 200, '', user);
    } catch (err) {
      return serviceResponse(
        'fail',
        401,
        'unAuthorized user ! Login to gain access'
      );
    }
  }

  static async authenticate(userToAuthenticate) {
    try {
      const user = await userRepository.findByEmail(userToAuthenticate.email);
      if (!user) {
        return serviceResponse('fail', 401, 'Incorrect Email Or Password');
      }
      const { userId, email, password } = user;
      const isValidPassword = await compare(
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
      const resetUrl = `${process.env.URL}/api/auth/resetPassword/${resetToken}`;
      await sendEmail({
        from: 'Natours',
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
        isValidPassword = await compare(
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
