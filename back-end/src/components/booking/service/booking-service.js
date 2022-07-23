const { serviceResponse } = require('../../../utils');
const { bookingRepository } = require('../repository');

class bookingService {
  static async find(query) {
    const pageNo = query.pageNo || 1;
    const perPage = query.perPage || 10;
    const offset = (pageNo - 1) * perPage;
    const count = await bookingRepository.count();
    try {
      const booking = await bookingRepository.find(offset, perPage);

      return serviceResponse(
        'success',
        200,
        'Successfully fetched all Bookings',
        {
          count,
          pageNo,
          perPage,
          booking
        }
      );
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async findById(bookingId) {
    try {
      const booking = await bookingRepository.findById(bookingId);
      if (!booking) {
        return serviceResponse('fail', 400, 'Invalid bookingId');
      }
      return serviceResponse('success', 200, 'Successfully fetched Booking', {
        booking
      });
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async deleteById(bookingId) {
    try {
      const booking = await bookingRepository.deleteById(bookingId);
      if (!booking) {
        return serviceResponse('fail', 400, 'Invalid bookingId');
      }
      return serviceResponse('success', 200, 'Successfully fetched Booking', {
        booking
      });
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }
}
module.exports = bookingService;
