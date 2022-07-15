const router = require('express').Router();

const { bookingId } = require('../../../middleware/schema/schema');
const { validate } = require('../../../middleware/schema/validate');

const { getAllBooking, getBooking, deleteBooking } = require('../controller');

router.get('/all', getAllBooking);
router.get('/:bookingId', validate(bookingId()), getBooking);
router.delete('/:booking', validate(bookingId()), deleteBooking);
module.exports = router;
