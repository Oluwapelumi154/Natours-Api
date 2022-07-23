const { sequelize } = require('../../../config/database');

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

exports.calculateAverageRatings = async (tourId) => {
  const review = await models.Review.findAll({
    where: { tourId },
    attributes: [
      'tourId',
      [sequelize.fn('COUNT', sequelize.col('reviewId')), 'noOfRatings'],
      [sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']
    ],
    group: ['tourId']
  });
  return review;
};
