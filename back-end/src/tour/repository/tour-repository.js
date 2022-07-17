const { sequelize } = require('../../../config/database');

const models = require('../../../config').db;

exports.create = async (data) => {
  const tour = await models.Tour.create(data);
  return tour;
};

exports.findById = async (tourId) => {
  const tour = await models.Tour.findOne({
    where: { tourId },
    include: ['Bookings', 'Guides', 'Reviews', 'startDates']
  });
  return tour;
};

exports.find = async (offset, perPage) => {
  const tour = await models.Tour.findAll({
    offset,
    perPage,
    include: ['startDates']
  });
  return tour;
};

exports.deleteById = async (tourId) => {
  const tour = await models.Tour.destroy({
    where: { tourId }
  });
  return tour;
};

exports.findByName = async (name) => {
  const tour = await models.Tour.findOne({
    where: { name }
  });
  return tour;
};
exports.count = async () => {
  const totalTour = await models.Tour.count();
  return totalTour;
};

exports.stats = async () => {
  const tourStats = await models.Tour.findAll({
    attributes: [
      'tourId',
      [sequelize.fn('COUNT', sequelize.col('tourId')), 'noOfTours'],
      [sequelize.fn('AVG', sequelize.col('price')), 'avgPrice'],
      [sequelize.fn('MAX', sequelize.col('price')), 'maxPrice'],
      [sequelize.fn('MIN', sequelize.col('price')), 'minPrice'],
      [sequelize.fn('SUM', sequelize.col('ratingsQuantity')), 'numRatings'],
      [sequelize.fn('AVG', sequelize.col('ratingsAverage')), 'avgRating']
    ],
    order: [['price']],
    group: ['tourId']
  });
  return tourStats;
};
