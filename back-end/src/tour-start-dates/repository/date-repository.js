const models = require('../../../config').db;

exports.create = async (data) => {
  const date = await models.startDate.create(data);
  return date;
};

exports.deleteById = async (dateId) => {
  const date = await models.startDate.destroy({
    where: { dateId }
  });
  return date;
};

exports.findById = async (dateId) => {
  const date = await models.startDate.findOne({
    where: { dateId }
  });
  return date;
};
