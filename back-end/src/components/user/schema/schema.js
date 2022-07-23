const { body, param } = require('express-validator');

exports.userToCreate = () => [
  body('firstName').notEmpty().withMessage('This is a required field'),
  body('lastName').notEmpty().withMessage('This is a required field'),
  body('email')
    .isEmail()
    .withMessage('Invalid Email Address')
    .notEmpty()
    .withMessage('This is a required field'),
  body('gender')
    .isIn(['male', 'female'])
    .withMessage('This is a required field'),
  body('password').notEmpty().withMessage('This is is a required field'),
  body('phoneNumber')
    .isMobilePhone()
    .withMessage('Invalid phoneNumber')
    .notEmpty()
    .withMessage('This is a required field')
];

exports.userId = () => [param('userId').isUUID().withMessage('Invalid Id')];

exports.userToUpdate = () => [
  body('password').trim().notEmpty().withMessage('This is a required field'),
  body('newPassword').trim().notEmpty().withMessage('This is a required field')
];
