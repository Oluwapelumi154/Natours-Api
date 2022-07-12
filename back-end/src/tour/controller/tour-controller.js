const { successResponseMsg, errResponseMsg } = require('../../../utils');
const { tourService } = require('../service');

exports.createTour = async (req, res) => {
  const { status, statusCode, message, data } = await tourService.create(
    req.body
  );
  if (statusCode === 201) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.getAllTours = async (req, res) => {
  const { status, statusCode, message, data } = await tourService.find(
    req.query
  );
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.getTour = async (req, res) => {
  const { status, statusCode, message, data } = await tourService.find(
    req.params.tourId
  );
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};
exports.updateTour = async (req, res) => {
  const { params, body } = req;
  const { status, statusCode, message, data } = await tourService.update(
    params.tourId,
    body
  );
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.deleteTour = async (req, res) => {
  const { status, statusCode, message, data } = await tourService.delete(
    req.params.tourId
  );
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.getTourStats = async (req, res) => {
  const { status, statusCode, message, data } = await tourService.tourStat();

  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};