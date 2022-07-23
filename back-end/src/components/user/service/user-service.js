const crypto = require('crypto');

const { randomUUID: uuidv4 } = crypto;

const { serviceResponse, signJWT, hash, resize } = require('../../../utils');

const { userRepository } = require('../repository');

class userService {
  static async create(body) {
    try {
      const userExist = await userRepository.findByEmail(body.email);
      if (userExist) {
        return serviceResponse('fail', 400, 'An account exist with this email');
      }
      const userId = uuidv4();
      const password = await hash(body.password);
      body.password = password;
      const fields = Object.keys(body);
      if (fields.includes('userId')) {
        delete body.userId;
      }
      if (fields.includes('resetToken')) {
        delete body.resetToken;
      }
      if (fields.includes('resetTokenExp')) {
        delete body.resetTokenExp;
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
      return serviceResponse('success', 201, 'Successfully Created User', {
        token,
        user: newUser
      });
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async findById(userId) {
    try {
      const user = await userRepository.findById(userId);
      if (!user) {
        return serviceResponse('fail', 400, 'Invalid userId');
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

  static async uploadImage(userId, file) {
    try {
      const user = await userRepository.findById(userId);
      if (!user) {
        return serviceResponse('success', 400, 'Invalid userId');
      }
      if (!file.mimetype.startsWith('image')) {
        return serviceResponse(
          'fail',
          400,
          'unsupported image type !upload image only'
        );
      }
      user.update({
        imgUrl: file.filename
      });
      return serviceResponse(
        'success',
        200,
        'successfully uploaded profile image',
        user
      );
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async delete(userId) {
    try {
      const user = await userRepository.deleteById(userId);
      if (!user) {
        return serviceResponse('fail', 400, 'Invalid userId');
      }
      return serviceResponse('success', 200, 'Successfully Deleted user');
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async updateUserProfile(userId, body) {
    try {
      const user = await userRepository.findById(userId);
      if (!user) {
        return serviceResponse('fail', 400, 'Invalid userId');
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

  static async resizeUserImage(file, user) {
    try {
      file.filename = `user-${user.id}.jpeg`;
      resize(file.buffer, 500, 500);
      return serviceResponse('sucess', 200, 'Successfully resized Image');
    } catch (err) {
      console.log(err.message);
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }
}
module.exports = userService;
