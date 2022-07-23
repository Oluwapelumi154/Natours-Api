const {
  successResponseMsg,
  errResponseMsg
} = require('../../../utils/response');

const { dateService } = require('../service');

exports.addTourDate = async (req, res) => {
  const { params, body } = req;
  const { status, statusCode, message, data } = await dateService.create(
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

exports.updateTourDate = async (req, res) => {
  const { params, body } = req;
  const { status, statusCode, message, data } = await dateService.update(
    params.dateId,
    body
  );

  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};
exports.deleteTourDate = async (req, res) => {
  const { params } = req;
  const { status, statusCode, message, data } = await dateService.delete(
    params.dateId
  );

  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.getTourDate = async (req, res) => {
  const { params } = req;
  const { status, statusCode, message, data } = await dateService.findById(
    params.dateId
  );

  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.getAllTourDate = async (req, res) => {
  const { status, statusCode, message, data } = await dateService.findAllDate(
    req.params.year
  );

  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};
