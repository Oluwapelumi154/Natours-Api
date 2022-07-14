const router = require('express').Router();
const { userRoute } = require('../src/user/route');
const { authRoute } = require('../src/auth/route');
const { tourRoute } = require('../src/tour/route');
const { bookingRoute } = require('../src/booking/route');
const { dateRoute } = require('../src/tour-start-dates/route');

router.use('/user', userRoute);
router.use('/auth', authRoute);
router.use('/tour', tourRoute);
router.use('/book', bookingRoute);
router.use('/date', dateRoute);
module.exports = router;
