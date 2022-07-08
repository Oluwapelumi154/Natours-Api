const { Op } = require('sequelize');

const models = require('../../../config').db;

exports.create = async (data) => {
  const user = await models.User.create(data);
  return user;
};

exports.findAll = async (offset, perPage) => {
  const user = await models.User.findAll({
    offset,
    perPage,
    raw: true,
    attributes: { exclude: ['password'] },
    paranoid: false
  });

  return user;
};

exports.findById = async (userId) => {
  const user = await models.User.findOne({
    where: { userId }
    // attributes: { exclude: ['password'] }
  });
  return user;
};

exports.findByEmail = async (email) => {
  const user = await models.User.findOne({ where: { email } });
  return user;
};

exports.findByIdAndDelete = async (userId) => {
  const user = await models.User.destroy({ where: { userId }, force: true });
  return user;
};

exports.count = async () => {
  const totalUser = await models.User.count();
  return totalUser;
};

exports.findByToken = async (resetToken) => {
  const user = await models.User.findOne({
    where: {
      resetToken,
      resetTokenExp: {
        [Op.gt]: Date.now()
      }
    }
  });
  return user;
};
