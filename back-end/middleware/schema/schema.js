const { body, param } = require('express-validator');

module.exports = Object.freeze({
  userId: () => [param('userId').isUUID().withMessage('Invalid Id')],

  userSignUpCredentials: () => [
    body('firstName')
      .trim()
      .not()
      .isEmpty()
      .withMessage('firstName is a required field'),
    body('lastName')
      .trim()
      .not()
      .isEmpty()
      .withMessage('lastName is a required field'),
    body('email')
      .trim()
      .isEmail()
      .withMessage('Invalid Email Address')
      .not()
      .isEmpty()
      .withMessage('email is a required field'),
    body('gender')
      .trim()
      .not()
      .isEmpty()
      .withMessage('gender is a required field'),
    body('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('password is a required field'),
    body('phoneNumber')
      .trim()
      .isMobilePhone()
      .withMessage('Invalid phoneNumber')
      .not()
      .isEmpty()
      .withMessage('phoneNumber is a required field')
  ],

  userLoginCredentails: () => [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Invalid Email Address')
      .not()
      .isEmpty()
      .withMessage('Email is a required field'),
    body('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('password is a required field')
  ],
  passwordUpdateCredentials: () => [
    body('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('password is a required field'),
    body('newPassword')
      .trim()
      .not()
      .isEmpty()
      .withMessage('newPassword is a required field')
  ]
});
