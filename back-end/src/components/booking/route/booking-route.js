const router = require('express').Router();
const {
  deleteBooking,
  getAllBooking,
  getBooking,
  getCheckOutSession
} = require('../controller');
const { isLoggedIn } = require('../../auth/controller');
const { validate } = require('../../../middlewares');
const { bookingId, tourId } = require('../schema');
router.get('/all', getAllBooking);
router.get('/:bookingId', validate(bookingId()), getBooking);
router.delete('/:booking', validate(bookingId()), deleteBooking);
router.get(
  '/checkoutSession/:tourId',
  validate(tourId()),
  isLoggedIn,
  getCheckOutSession
);
module.exports = router;
