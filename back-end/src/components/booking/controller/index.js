const bookingController = require('./booking-controller');

module.exports = Object.freeze({
  deleteBooking: bookingController.deleteBooking,
  getAllBooking: bookingController.getAllBooking,
  getBooking: bookingController.getBooking,
  getCheckOutSession: bookingController.getCheckOutSession
});
