const router = require('express').Router();

const { tourId } = require('../../../middleware/schema/schema');
const { validate } = require('../../../middleware/schema/validate');
const { isLoggedIn } = require('../../auth/controller');
const { bookTour } = require('../controller');

router.post('/:tourId', isLoggedIn, validate(tourId()), bookTour);
module.exports = router;
