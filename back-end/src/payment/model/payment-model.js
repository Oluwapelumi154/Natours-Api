module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define('Payment', {});
  return payment;
};
