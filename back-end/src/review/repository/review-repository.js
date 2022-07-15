const models = require('../../../config').db;

exports.create = async (data) => {
  const review = await models.Review.create(data);
  return review;
};

exports.find = async () => {
  const review = await models.Review.findAll();
  return review;
};
