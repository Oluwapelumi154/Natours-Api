const router = require('express').Router();
const { isLoggedIn } = require('../../auth/controller');
const { uploadTourImages } = require('../../../middlewares/upload');
const { tourToCreate, tourId, guideToCreate } = require('../schema');
const {
  createTour,
  getMonthlyPlan,
  getTour,
  getTourStats,
  updateTour,
  deleteTour,
  addTourGuide,
  getAllTours,
  ratings,
  bookTour,
  createReview,
  resizeTourImages
} = require('../controller');
const { validate } = require('../../../middlewares');

router.post('/', validate(tourToCreate()), createTour);
router.get('/plan', getMonthlyPlan);
router.get('/stats', getTourStats);
router.get('/all', getAllTours);
router.get('/:tourId', validate(tourId()), getTour);
router.patch('/:tourId', uploadTourImages, resizeTourImages, updateTour);
router.delete('/:tourId', deleteTour);
router.post(
  '/:tourId/guide',
  validate(tourId()),
  validate(guideToCreate()),
  addTourGuide
);
router.post('/:tourId/review', validate(tourId()), isLoggedIn, createReview);

router.post('/:tourId/book', validate(tourId()), isLoggedIn, bookTour);

router.get('/:tourId/ratings', ratings);

module.exports = router;
