const tourRepository = require('./tour-repository');
const guideRepository = require('./guide-repository');
const reviewRepository = require('./review-repository');
const dateRepository = require('./date-repository');
const transactionRepository = require('./tour-repository');
const imgRepository = require('./img-respository');
module.exports = Object.freeze({
  tourRepository,
  guideRepository,
  reviewRepository,
  dateRepository,
  transactionRepository,
  imgRepository
});
