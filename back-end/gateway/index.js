const router = require('express').Router();
const { userRoute } = require('../src/user/route');
const { authRoute } = require('../src/auth/route');
const { tourRoute } = require('../src/tour/route');
const { bookingRoute } = require('../src/booking/route');

router.use('/user', userRoute);
router.use('/auth', authRoute);
router.use('/tour', tourRoute);
router.use('/booking', bookingRoute);
module.exports = router;
