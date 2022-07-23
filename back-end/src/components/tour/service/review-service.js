const { randomUUID: uuidv4 } = require('crypto');
const { serviceResponse } = require('../../../utils');
const { tourRepository, reviewRepository } = require('../repository');

class reviewService {
  static async createReview(userId, tourId, body) {
    try {
      const tour = await tourRepository.findById(tourId);
      if (!tour) {
        return serviceResponse('fail', 400, 'Invalid Id');
      }
      const { dataValues } = tour;
      const userReviewExist = await reviewRepository.findUser(
        userId,
        dataValues.id
      );
      if (userReviewExist) {
        return serviceResponse('fail', 400, 'You alreaady Reviewed this tour');
      }

      const reviewId = uuidv4();
      const review = {
        reviewId,
        userId,
        tourId: dataValues.id,
        ...body
      };
      const newReview = await reviewRepository.create(review);

      return serviceResponse('success', 201, 'success', { review: newReview });
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async ratings(tourId) {
    try {
      const tour = await tourRepository.findById(tourId);
      if (!tour) {
        return serviceResponse('fail', 400, 'Invalid tourId');
      }
      const { dataValues } = tour;
      const review = await reviewRepository.calculateAverageRatings(
        dataValues.id
      );
      tour.update({
        ratingsQuantity: review[0].dataValues.noOfRatings,
        ratingsAverage: review[0].dataValues.avgRating
      });
      return serviceResponse('success', 200, 'success', { reviews: review });
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }
}

module.exports = reviewService;
