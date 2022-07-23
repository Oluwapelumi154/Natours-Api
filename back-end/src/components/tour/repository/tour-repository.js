const { sequelize } = require('../../../config/database');

const models = require('../../../config').db;

exports.create = async (data) => {
  const tour = await models.Tour.create(data);
  return tour;
};

exports.findById = async (tourId) => {
  const tour = await models.Tour.findOne({
    where: { tourId },
    include: ['Bookings', 'Guides', 'Reviews', 'startDates', 'Images']
  });

  return tour;
};

exports.find = async (offset, perPage) => {
  const tour = await models.Tour.findAll({
    offset,
    perPage,
    include: ['startDates', 'Images']
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
      'difficulty',
      [sequelize.fn('COUNT', sequelize.col('price')), 'noOfTours'],
      [sequelize.fn('SUM', sequelize.col('ratingsQuantity')), 'noOfRating'],
      [sequelize.fn('AVG', 'noOfRating'), 'avgRating']
    ],
    order: [['price']],
    group: ['difficulty']
  });
  return tourStats;
};
