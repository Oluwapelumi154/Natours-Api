const {
  createTour,
  deleteTour,
  getAllTours,
  getTour,
  updateTour,
  addTourGuide,
  bookTour,
  getTourStats,
  getMonthlyPlan
} = require('./tour-controller');

module.exports = Object.freeze({
  createTour,
  deleteTour,
  getAllTours,
  getTour,
  updateTour,
  addTourGuide,
  bookTour,
  getTourStats,
  getMonthlyPlan
});
