const crypto = require('crypto');

const { randomUUID: uuidv4 } = crypto;

const {
  serviceResponse,
  signJWT,
  passwordResetToken,
  hashToken
} = require('../../../utils');

const { userRepository } = require('../repository');

const { hash, compare } = require('../../../utils');

class userService {
  static async create(body) {
    try {
      const userExist = await userRepository.findByEmail(body.email);
      if (userExist) {
        return serviceResponse(
          'fail',
          400,
          'A user Already exist with this Email'
        );
      }
      const userId = uuidv4();
      const password = await hash(body.password);
      body.password = password;
      const fields = Object.keys(body);
      if (fields.includes('role')) {
        delete body.role;
      }
      if (fields.includes('userId')) {
        delete body.userId;
      }
      if (fields.includes('resetToken')) {
        delete body.resetToken;
      }
      if (fields.includes('resetTokenExp')) {
        delete body.resetToken;
      }
      if (fields.includes('status')) {
        delete body.status;
      }
      if (fields.includes('passwordChangedAt')) {
        delete body.passwordChangedAt;
      }
      const user = {
        userId,
        ...body
      };

      const token = signJWT(user.userId, user.email);
      const newUser = await userRepository.create(user);
      return serviceResponse('success', 201, 'Successfully Registered', {
        token,
        newUser
      });
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async authenticate(body) {
    try {
      const user = await userRepository.findByEmail(body.email);
      let isValidPassword;
      let userObj;
      if (user) {
        const { userId, email, password } = user.dataValues;
        isValidPassword = await compare(body.password, password);
        userObj = {
          userId,
          email
        };
      }
      if (!user) {
        return serviceResponse('fail', 401, 'Incorrect Email Or Password');
      }
      if (!isValidPassword) {
        return serviceResponse('fail', 401, 'Incorrect Email Or Password');
      }
      const token = signJWT(userObj.userId, userObj.email);
      return serviceResponse('success', 200, 'Successfully Authenticated', {
        token
      });
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async findById(userId) {
    try {
      const user = await userRepository.findById(userId);
      if (!user) {
        return serviceResponse('fail', 400, 'Invalid Id');
      }
      return serviceResponse('success', 200, 'Successfully fetched user', user);
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async block(userId) {
    try {
      const user = await userRepository.findById(userId);
      if (!user) {
        return serviceResponse('fail', 400, 'Invalid Id');
      }
      user.update({
        status: '1'
      });
      return serviceResponse('success', 200, 'Successfully Blocked user');
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async unBlock(userId) {
    try {
      const user = await userRepository.findById(userId);
      if (!user) {
        return serviceResponse('fail', 400, 'Invalid Id');
      }
      user.update({
        status: '0'
      });
      return serviceResponse('success', 200, 'Successfully unBlocked user');
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async find(query) {
    try {
      const pageNo = parseInt(query.pageNo, 10) || 1;
      const perPage = parseInt(query.perPage, 10) || 10;
      const offset = (pageNo - 1) * perPage;
      const user = await userRepository.findAll(offset, perPage);
      const count = await userRepository.count();
      return serviceResponse('success', 200, 'Successfully fetched All Users', {
        count,
        pageNo,
        perPage,
        user
      });
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async delete(userId) {
    try {
      const user = await userRepository.deleteById(userId);
      if (!user) {
        return serviceResponse(
          'fail',
          400,
          'No user found with the provided Id'
        );
      }
      return serviceResponse('success', 200, 'Successfully Deleted user');
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static changedPasswordAfter(jwtTimeStamp, passwordChangedAt) {
    if (passwordChangedAt) {
      const changedTimeStamp = parseInt(passwordChangedAt.getTime() / 1000, 10);
      return jwtTimeStamp < changedTimeStamp;
    }
    return false;
  }

  static async forgotPassword(body) {
    try {
      const user = await userRepository.findByEmail(body.email);
      const { resetToken, hashedToken } = passwordResetToken();
      if (!user) {
        return serviceResponse('fail', 400, 'No user with this email');
      }
      user.update({
        resetToken: hashedToken,
        resetTokenExp: Date.now() + 10 * 60 * 1000
      });
      return serviceResponse('success', 200, '', { user, resetToken });
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async findByToken(resetToken, body) {
    try {
      const hashedResetToken = hashToken(resetToken);
      const user = await userRepository.findByToken(hashedResetToken);
      let userObj;
      if (user) {
        const { dataValues } = user;
        userObj = {
          userId: dataValues.userId,
          email: dataValues.email
        };
      }
      if (!user) {
        return serviceResponse(
          'fail',
          400,
          'Reset Token is Invalid or Expired'
        );
      }
      body.password = await hash(body.password);
      user.update({
        password: body.password,
        passwordChangedAt: Date.now() - 1000,
        resetToken: null,
        resetTokenExp: null
      });
      const token = signJWT(userObj.userId, userObj.email);
      return serviceResponse(
        'success',
        200,
        'You have Sucessfully reset your password',
        { token }
      );
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async updateUserPassword(userId, body) {
    try {
      const user = await userRepository.findById(userId);
      if (!user) {
        return serviceResponse('fail', 400, 'Invalid Id');
      }
      let isValidPassword;
      if (user) {
        const { password } = user.dataValues;
        isValidPassword = await compare(body.password, password);
      }
      if (!isValidPassword) {
        return serviceResponse('fail', 400, 'Incorrect Password');
      }
      body.newPassword = await hash(body.newPassword);
      user.update({
        password: body.newPassword
      });
      return serviceResponse('success', 200, 'Successfully Updated Password');
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async updateUserProfile(userId, body) {
    try {
      const user = await userRepository.findById(userId);
      if (!user) {
        return serviceResponse('fail', 400, 'Invalid Id');
      }
      user.update({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        gender: body.gender,
        imgUrl: body.imgUrl
      });
      return serviceResponse('success', 200, 'Successfully Updated Profile');
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }
}
module.exports = userService;
