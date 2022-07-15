const router = require('express').Router();

const {
  tourCredentials,
  tourId,
  guideData
} = require('../../../middleware/schema/schema');

const {
  createTour,
  getTour,
  getAllTours,
  updateTour,
  deleteTour,
  addTourGuide,
  bookTour
} = require('../controller');

const { validate } = require('../../../middleware/schema/validate');
const { isLoggedIn } = require('../../auth/controller');
const { createReview } = require('../../review/controller');

router.post('/', validate(tourCredentials()), createTour);
router.get('/all', getAllTours);
router.get('/:tourId', getTour);
router.patch('/:tourId', updateTour);
router.delete('/:tourId', deleteTour);
router.post(
  '/:tourId/guide',
  validate(tourId()),
  validate(guideData()),
  addTourGuide
);
router.post('/:tourId/review', validate(tourId()), isLoggedIn, createReview);

router.post('/:tourId/book', validate(tourId()), isLoggedIn, bookTour);
module.exports = router;
