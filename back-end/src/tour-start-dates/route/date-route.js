const router = require('express').Router();
const { tourStartDate, dateId } = require('../../../middleware/schema/schema');
const { validate } = require('../../../middleware/schema/validate');
const { addTourDate } = require('../controller');
const {
  deleteTourDate,
  updateTourDate,
  getTourDate
} = require('../controller/date-controller');

router.post('/:tourId', validate(tourStartDate()), addTourDate);
router.delete('/:dateId', validate(dateId()), deleteTourDate);
router.patch('/:dateId', validate(dateId()), updateTourDate);
router.get('/:dateId', validate(dateId()), getTourDate);

module.exports = router;
