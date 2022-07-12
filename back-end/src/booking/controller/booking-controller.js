const { successResponseMsg, errResponseMsg } = require('../../../utils');
const { bookingService } = require('../service');

exports.bookTour = async (req, res) => {
  const { user, params } = req;
  const { status, statusCode, message, data } = await bookingService.create(
    user.userId,
    params.tourId
  );
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};
exports.getAllBooking = async (req, res) => {};
exports.getBooking = async (req, res) => {};
