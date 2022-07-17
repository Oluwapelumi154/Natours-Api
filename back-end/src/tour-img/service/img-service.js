const { randomUUID: uuidv4 } = require('crypto');
const { serviceResponse } = require('../../../utils');
const { imgRepository } = require('../repository');

class imgService {
  static async create(body) {
    try {
      const imageId = uuidv4();
      const imgDataObj = {
        imageId,
        ...body
      };
      const img = await imgRepository.create(imgDataObj);
      return serviceResponse('success', 200, 'Successfully Added an Image');
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }
}
module.exports = imgService;
