const { randomUUID: uuidv4 } = require('crypto');
const { serviceResponse } = require('../../../utils');
const { tourRepository } = require('../../tour/repository');
const { reviewRepository } = require('../repository');

class reviewService {
  static async create(tourId, userId, body) {
    try {
      const tour = await tourRepository.findById(tourId);
      if (!tour) {
        return serviceResponse('fail', 400, 'Invalid tourId');
      }
      const reviewId = uuidv4();
      const reviewDataObj = {
        reviewId,
        ...body
      };
      const review = await reviewRepository.create(reviewDataObj);
      review.update({
        tourId: tour.dataValues.id,
        userId
      });
      return serviceResponse(
        'success',
        201,
        'Successfully Reviewed this Tour',
        { review }
      );
    } catch (err) {
      console.log(err);
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }
}

module.exports = reviewService;
