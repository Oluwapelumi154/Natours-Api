const { param } = require('express-validator');
exports.bookingId = () => [
  param('bookingId').isUUID().withMessage('Invalid Id')
];

exports.tourId = () => [param('tourId').isUUID().withMessage('Invalid Id')];
