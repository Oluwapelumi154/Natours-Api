const models = require('../../../config').db;

exports.checkOutSession = async (data) => {
  const tranx = await models.Transaction.create(data);
  return tranx;
};
