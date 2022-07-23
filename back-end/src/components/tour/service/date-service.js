const { randomUUID: uuidv4 } = require('crypto');
const { serviceResponse } = require('../../../utils/response');
const { tourRepository } = require('../repository');
const { dateRepository } = require('../repository');

class dateService {
  static async create(tourId, body) {
    try {
      const tour = await tourRepository.findById(tourId);
      if (!tour) {
        return serviceResponse('fail', 400, 'Invalid tourId');
      }
      const dateId = uuidv4();
      const data = {
        dateId,
        tourId: tour.dataValues.id,
        date: body.date
      };
      const date = await dateRepository.create(data);
      return serviceResponse('success', 200, 'Successfully added a date', date);
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async delete(dateId) {
    try {
      const tour = await dateRepository.deleteById(dateId);
      if (!tour) {
        return serviceResponse('fail', 400, 'Invalid dateId');
      }
      return serviceResponse('success', 200, 'Successfully deleted date');
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async update(dateId, body) {
    try {
      const tour = await dateRepository.findById(dateId);
      if (!tour) {
        return serviceResponse('fail', 400, 'Invalid dateId');
      }
      tour.update({
        date: body.date
      });
      return serviceResponse('success', 200, 'Successfully updated date');
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async findById(dateId) {
    try {
      const tour = await dateRepository.findById(dateId);
      if (!tour) {
        return serviceResponse('fail', 400, 'Invalid dateId');
      }
      return serviceResponse(
        'success',
        200,
        'Successfully fetched tour date',
        tour
      );
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async findAllDate(year) {
    try {
      const tour = await dateRepository.find(year);
      return serviceResponse(
        'success',
        200,
        'Successfully fetched All tour date',
        tour
      );
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }
}

module.exports = dateService;
