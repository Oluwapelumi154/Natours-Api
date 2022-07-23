const models = require('../../../config').db;
exports.create = async (data) => {
  const image = await models.Image.create(data);
};
