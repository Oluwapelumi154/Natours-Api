const models = require('../../../config').db;

exports.create = async (data) => {
  const tourImg = await models.Image.create(data);
  return tourImg;
};
