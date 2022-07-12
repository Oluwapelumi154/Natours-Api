const router = require('express').Router();

const { tourCredentials } = require('../../../middleware/schema/schema');

const {
  createTour,
  getTour,
  getAllTours,
  updateTour,
  deleteTour
} = require('../controller');

const { validate } = require('../../../middleware/schema/validate');

router.post('/', validate(tourCredentials()), createTour);
router.post('/all', getAllTours);
router.get('/:tourId', getTour);
router.patch('/:tourId', updateTour);
router.delete('/:tourId', deleteTour);
module.exports = router;
