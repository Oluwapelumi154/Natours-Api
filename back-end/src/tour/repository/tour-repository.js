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
  const tour = await models.Tour.findAll({ offset, perPage });
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
      sequelize.fn('AVG', sequelize.col('ratingsAverage'), 'avgRating'),
      sequelize.fn('AVG', sequelize.col('price'), 'avgPrice'),
      sequelize.fn('MIN', sequelize.col('price'), 'minPrice'),
      sequelize.fn('MAX', sequelize.col('price'), 'maxPrice')
    ],
    group: 'tourId'
  });
  return tourStats;
};
