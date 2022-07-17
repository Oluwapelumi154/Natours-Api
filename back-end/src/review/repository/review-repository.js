const models = require('../../../config').db;

exports.create = async (data) => {
  const review = await models.Review.create(data);
  return review;
};

exports.find = async () => {
  const review = await models.Review.findAll();
  return review;
};

exports.findUser = async (userId, tourId) => {
  const review = await models.Review.findOne({ where: { userId, tourId } });
  return review;
};
