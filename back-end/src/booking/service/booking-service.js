const { randomUUID: uuidv4 } = require('crypto');
const { serviceResponse } = require('../../../utils');
const { tourRepository } = require('../../tour/repository');
const { userRepository } = require('../../user/repository');
const { bookingRepository } = require('../repository');

class bookingService {
  static async create(userId, tourId) {
    try {
      const user = await userRepository.findById(userId);
      const tour = await tourRepository.findById(tourId);
      if (!tour) {
        return serviceResponse('fail', 400, 'Invalid tour Id');
      }
      const bookingId = uuidv4();
      const bookingObj = {
        bookingId,
        tourId: tour.dataValues.id,
        userId: user.dataValues.id
      };
      const booking = await bookingRepository.create(bookingObj);
      return serviceResponse('success', 200, 'Successfully Booked a Tour', {
        booking
      });
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }
}
module.exports = bookingService;
