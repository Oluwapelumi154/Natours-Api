const { randomUUID: uuidv4 } = require('crypto');
const { serviceResponse } = require('../../../utils/response');
const { guideRepository } = require('../repository');

class guideService {
  static async create(body) {
    try {
      const guideExist = await guideRepository.findByEmail(body.email);
      if (guideExist) {
        return serviceResponse(
          'fail',
          400,
          'A guide already exist with this email'
        );
      }
      const guideId = uuidv4();
      const guideData = {
        guideId,
        ...body
      };
      const newGuide = await guideRepository.create(guideData);
      return serviceResponse(
        'success',
        201,
        'Successfully added a guide',
        newGuide
      );
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async findAllGuide(query) {
    const pageNo = parseInt(query.pageNo, 10) || 1;
    const perPage = parseInt(query.perPage, 10) || 10;
    const offset = (pageNo - 1) * perPage;
    const count = await guideRepository.count();
    try {
      const guide = await guideRepository.find(offset, perPage);
      return serviceResponse('success', 200, 'Successfully fetched all guide', {
        count,
        pageNo,
        perPage,
        guide
      });
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async findGuide(guideId) {
    try {
      const guide = await guideRepository.findById(guideId);
      if (!guide) {
        return serviceResponse('fail', 400, 'Invalid guideId');
      }
      return serviceResponse(
        'success',
        200,
        'Successfully fetched guide',
        guide
      );
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async updateGuide(guideId, body) {
    try {
      const guide = await guideRepository.findById(guideId);
      if (!guide) {
        return serviceResponse('fail', 400, 'Invalid guideId');
      }
      guide.update({
        role: body.role
      });
      return serviceResponse('success', 200, 'Successfully updated guide');
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async deleteGuide(guideId) {
    try {
      const guide = await guideRepository.deleteById(guideId);
      if (!guide) {
        return serviceResponse('fail', 400, 'Invalid guideId');
      }
      return serviceResponse('success', 200, 'Successfully deleted guide');
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }
}
module.exports = guideService;
