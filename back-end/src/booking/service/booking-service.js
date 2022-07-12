const { randomUUID: uuidv4 } = require('crypto');
const { serviceResponse } = require('../../../utils');
const { bookingRepository } = require('../repository');

class bookingService {
  static async create(userId, tourId) {
    try {
      const booked = await bookingRepository.findByTour(tourId);
      if (booked) {
        return serviceResponse('fail', 400, 'You recently booked this tour');
      }
      const bookingId = uuidv4();
      const bookingObj = {
        bookingId,
        tourId,
        userId
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
