const { errResponseMsg, successResponseMsg } = require('../../../utils');
const { reviewService } = require('../service');

exports.createReview = async (req, res) => {
  const { params, body, user } = req;
  const { status, statusCode, message, data } =
    await reviewService.createReview(user.id, params.tourId, body);
  if (statusCode === 201) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode === 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.ratings = async (req, res) => {
  const { params } = req;
  const { status, statusCode, message, data } = await reviewService.ratings(
    params.tourId
  );
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode === 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};
