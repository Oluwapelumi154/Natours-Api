const { body, param } = require('express-validator');

module.exports = Object.freeze({
  userId: () => [param('userId').isUUID().withMessage('Invalid Id')],
  tourId: () => [param('tourId').isUUID().withMessage('Invalid Id')],
  dateId: () => [param('dateId').isUUID().withMessage('Invalid Id')],
  guideId: () => [param('guideId').isUUID().withMessage('Invalid Id')],
  bookingId: () => [param('bookingId').isUUID().withMessage('Invalid Id')],

  tourStartDate: () => [
    body('date').trim().notEmpty().withMessage('This is a required field')
  ],
  userSignUpCredentials: () => [
    body('firstName')
      .trim()
      .notEmpty()
      .withMessage('firstName is a required field'),
    body('lastName')
      .trim()
      .notEmpty()
      .withMessage('lastName is a required field'),
    body('email')
      .trim()
      .isEmail()
      .withMessage('Invalid Email Address')
      .notEmpty()
      .withMessage('email is a required field'),
    body('gender')
      .trim()
      .isIn(['male', 'female'])
      .withMessage('gender is a required field'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('password is a required field'),
    body('phoneNumber')
      .trim()
      .isMobilePhone()
      .withMessage('Invalid phoneNumber')
      .notEmpty()
      .withMessage('phoneNumber is a required field')
  ],

  userLoginCredentails: () => [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Invalid Email Address')
      .notEmpty()
      .withMessage('Email is a required field'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('password is a required field')
  ],
  passwordUpdateCredentials: () => [
    body('password')
      .trim()
      .notEmpty()
      .withMessage('password is a required field'),
    body('newPassword')
      .trim()
      .notEmpty()
      .withMessage('newPassword is a required field')
  ],
  tourCredentials: () => [
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
    body('description')
      .trim()
      .notEmpty()
      .withMessage('This is a required field'),
    body('imageCover').trim().notEmpty().withMessage('This is a required field')
  ],

  guideData: () => [
    body('role')
      .trim()
      .isIn(['lead-guide', 'tour-guide'])
      .notEmpty()
      .withMessage('role is a required field'),
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
  ],

  guideDataToUpdate: () => [
    body('role').trim().isIn(['lead-guide', 'tour-guide']).optional()
  ]
});
