const { body, param } = require('express-validator');

module.exports = Object.freeze({
  userId: () => [param('userId').isUUID().withMessage('Invalid Id')],
  tourId: () => [param('tourId').isUUID().withMessage('Invalid Id')],
  dateId: () => [param('dateId').isUUID().withMessage('Invalid Id')],
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
    body('gender').trim().notEmpty().withMessage('gender is a required field'),
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
    body('name').trim().not().isEmpty().withMessage('This is a required field'),
    body('maxGroupSize')
      .trim()
      .isEmpty()
      .withMessage('This is a required field'),
    body('difficulty')
      .trim()
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
      .isEmpty()
      .withMessage('This is a required field'),
    body('imageCover').trim().notEmpty().withMessage('This is a required field')
  ]
});
