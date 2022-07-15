const models = require('../../../config').db;

exports.create = async (data) => {
  const guide = await models.Guide.create(data);
  return guide;
};

exports.find = async (offset, perPage) => {
  const guide = await models.Guide.findAll({ offset, perPage });
  return guide;
};

exports.findById = async (guideId) => {
  const guide = await models.Guide.findOne({ where: { guideId } });
  return guide;
};

exports.findByEmail = async (email) => {
  const guide = await models.Guide.findOne({ where: { email } });
  return guide;
};

exports.deleteById = async (guideId) => {
  const guide = await models.Guide.destroy({ where: { guideId } });
  return guide;
};

exports.count = async () => {
  const totalGuide = await models.Guide.count();
  return totalGuide;
};
