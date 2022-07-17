const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');

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

exports.find = async (year) => {
  const date = await models.startDate.findAll({
    where: {
      date: {
        [Op.gte]: new Date(`${year}-01-01`),
        [Op.lte]: new Date(`${year}-12-31`)
      }
    },
    attributes: [
      'tourId',
      [sequelize.col('date'), 'startDate'],
      [sequelize.fn('MONTH', sequelize.col('date')), 'month'],
      [sequelize.fn('COUNT', sequelize.col('date')), 'numOfTours'],
      [sequelize.fn('YEAR', sequelize.col('date')), 'year']
    ],
    order: ['tourId'],
    group: [[sequelize.fn('MONTH', sequelize.col('date')), 'id']]
  });
  return date;
};

exports.findById = async (dateId) => {
  const date = await models.startDate.findOne({
    where: { dateId }
  });
  return date;
};
