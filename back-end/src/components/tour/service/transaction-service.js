/* eslint-disable camelcase */
const { randomUUID: uuidv4 } = require('crypto');
const { checkOutSession } = require('../../../utils');
const { tourRepository } = require('../repository');
const { serviceResponse } = require('../../../utils');

class transactionService {
  static async checkOut(tourId, user) {
    try {
      const tour = await tourRepository.findById(tourId);
      if (!tour) {
        return serviceResponse('fail', 400, 'Invalid tourId');
      }
      const session = await checkOutSession(user, tour);
      // eslint-disable-next-line no-unused-vars
      // const tranxId = uuidv4();
      // const newTranx = await transactionRepository.create(tranx);
      return serviceResponse('success', 200, 'Successfully Booked a Tour', {
        session
      });
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }
}
module.exports = transactionService;
