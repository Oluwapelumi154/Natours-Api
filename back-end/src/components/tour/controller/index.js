const reviewController = require('./review-controller');
const tourController = require('./tour-controller');

module.exports = Object.freeze({
  /** Tour */
  createTour: tourController.createTour,
  getMonthlyPlan: tourController.getMonthlyPlan,
  getTour: tourController.getTour,
  getTourStats: tourController.getTourStats,
  updateTour: tourController.updateTour,
  deleteTour: tourController.deleteTour,
  addTourGuide: tourController.addTourGuide,
  bookTour: tourController.bookTour,
  getAllTours: tourController.getAllTours,
  uploadTourImages: tourController.uploadTourImages,
  resizeTourImages: tourController.resizeTourImages,

  /** Review */
  createReview: reviewController.createReview,
  ratings: reviewController.ratings
});
