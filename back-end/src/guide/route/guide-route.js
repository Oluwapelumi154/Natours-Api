const router = require('express').Router();

const {
  guideData,
  guideId,
  guideDataToUpdate
} = require('../../../middleware/schema/schema');
const { validate } = require('../../../middleware/schema/validate');
const {
  createGuide,
  getGuides,
  getGuide,
  updateGuide,
  deleteGuide
} = require('../controller');

router.post('/register', validate(guideData()), createGuide);
router.get('/all', getGuides);
router.get('/:guideId', getGuide);
router.patch(
  '/:guideId',
  validate(guideId()),
  validate(guideDataToUpdate()),
  updateGuide
);
router.delete('/:guideId', validate(guideId()), deleteGuide);

module.exports = router;
