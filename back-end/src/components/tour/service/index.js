const tourService = require('./tour-service');
const reviewService = require('./review-service');
const transactionService = require('./transaction-service');

module.exports = Object.freeze({
  tourService,
  reviewService,
  transactionService
});
