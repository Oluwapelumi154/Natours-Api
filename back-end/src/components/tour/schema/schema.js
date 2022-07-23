const { body, param } = require('express-validator');

/*Tour Schemas* */

exports.tourToCreate = () => [
  body('name').trim().notEmpty().withMessage('This is a required field'),
  body('maxGroupSize')
    .trim()
    .notEmpty()
    .withMessage('This is a required field'),
  body('difficulty')
    .trim()
    .isIn(['easy', 'medium', 'difficult'])
    .notEmpty()
    .withMessage('This is a required field'),
  body('price').trim().notEmpty().withMessage('This is a required field'),
  body('durations').trim().notEmpty().withMessage('This is a required field'),
  body('ratingsAverage').trim().optional(),
  body('ratingsQuantity').trim().optional(),
  body('priceDiscount').trim().optional(),
  body('summary').trim().optional(),
  body('description').trim().notEmpty().withMessage('This is a required field'),
  body('imageCover').trim().notEmpty().withMessage('This is a required field')
];

exports.tourId = () => [param('tourId').isUUID().withMessage('Invalid Id')];

exports.guideToCreate = () => [
  body('role')
    .trim()
    .isIn(['lead-guide', 'tour-guide'])
    .notEmpty()
    .withMessage('This is a required field'),
  body('email')
    .isEmail()
    .withMessage('invalid email')
    .notEmpty()
    .withMessage('email is a required field'),
  body('phoneNumber')
    .trim()
    .isMobilePhone()
    .withMessage('Enter a valid mobileNo')
    .notEmpty()
    .withMessage('mobileNo is a required field'),
  body('gender')
    .trim()
    .isIn(['male', 'female'])
    .notEmpty()
    .withMessage('gender is a required field')
];

exports.guideToUpdate = () => [
  body('role').trim().isIn(['lead-guide', 'tour-guide']).optional()
];
