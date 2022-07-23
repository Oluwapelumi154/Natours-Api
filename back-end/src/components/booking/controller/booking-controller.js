const { successResponseMsg, errResponseMsg } = require('../../../utils');
const { transactionService } = require('../../tour/service');

const { bookingService } = require('../service');

exports.getAllBooking = async (req, res) => {
  const { status, statusCode, message, data } = await bookingService.find(
    req.query
  );
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, message);
  }
};
exports.getBooking = async (req, res) => {
  const { params } = req;
  const { status, statusCode, message, data } = await bookingService.findById(
    params.bookingId
  );
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, message);
  }
};
exports.deleteBooking = async (req, res) => {
  const { params } = req;
  const { status, statusCode, message, data } = await bookingService.deleteById(
    params.bookingId
  );
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, message);
  }
};

exports.getCheckOutSession = async (req, res) => {
  const { user, params } = req;
  const { status, statusCode, message, data } =
    await transactionService.checkOut(params.tourId, user);
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode === 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};
