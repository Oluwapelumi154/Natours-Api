const { successResponseMsg, errResponseMsg } = require('../../../utils');

const { guideService } = require('../service');

exports.createGuide = async (req, res) => {
  const { status, statusCode, message, data } = await guideService.create(
    req.body
  );
  if (statusCode === 201) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, statusCode, message);
  }
};

exports.getGuides = async (req, res) => {
  const { status, statusCode, message, data } = await guideService.findAllGuide(
    req.query
  );
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, statusCode, message);
  }
};

exports.getGuide = async (req, res) => {
  const { params } = req;
  const { status, statusCode, message, data } = await guideService.findGuide(
    params.guideId
  );
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.updateGuide = async (req, res) => {
  const { params, body } = req;
  const { status, statusCode, message, data } = await guideService.updateGuide(
    params.guideId,
    body
  );
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, status, statusCode, message);
  }
};

exports.deleteGuide = async (req, res) => {
  const { params } = req;
  const { status, statusCode, message, data } = await guideService.deleteGuide(
    params.guideId
  );
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errResponseMsg(res, statusCode, message);
  }
};
