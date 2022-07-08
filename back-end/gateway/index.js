const router = require('express').Router();
const { userRoute } = require('../src/user/route');
const { authRoute } = require('../src/auth/route');

router.use('/user', userRoute);
router.use('/auth', authRoute);
module.exports = router;
