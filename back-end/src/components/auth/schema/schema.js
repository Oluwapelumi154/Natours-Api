const { body } = require('express-validator');

exports.userToAuth = () => [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid Email Address')
    .notEmpty()
    .withMessage('This is a required field'),
  body('password').trim().notEmpty().withMessage('This is a required field')
];

exports.userToUpdate = () => [
  body('password').trim().notEmpty().withMessage('This is a required field'),
  body('newPassword').trim().notEmpty().withMessage('This is a required field')
];
