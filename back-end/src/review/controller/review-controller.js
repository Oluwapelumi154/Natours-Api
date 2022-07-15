const { successResponseMsg, errResponseMsg } = require('../../../utils');
const { reviewService } = require('../service');

exports.createReview = async (req, res) => {
  const { params, user, body } = req;
  const { status, statusCode, message, data } = await reviewService.create(
    params.tourId,
    user.id,
    body
  );
  if (statusCode === 201) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};
