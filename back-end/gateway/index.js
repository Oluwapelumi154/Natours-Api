const router = require('express').Router();
const { userRoute } = require('../src/components/user/route');
const { authRoute } = require('../src/components/auth/route');
const { tourRoute } = require('../src/components/tour/route');
const { bookingRoute } = require('../src/components/booking/route');

router.use('/user', userRoute);
router.use('/auth', authRoute);
router.use('/tour', tourRoute);
router.use('/booking', bookingRoute);
module.exports = router;
