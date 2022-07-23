const models = require('../../../config').db;

exports.create = async (data) => {
  const booking = await models.Booking.create(data);
  return booking;
};

exports.find = async (offset, perPage) => {
  const booking = await models.Booking.findAll({
    offset,
    perPage,
    paranoid: false
  });
  return booking;
};

exports.findById = async (bookingId) => {
  const booking = await models.Booking.findOne({
    where: { bookingId }
  });
  return booking;
};

exports.deleteById = async (bookingId) => {
  const booking = await models.Booking.destroy({
    where: { bookingId }
  });
  return booking;
};

exports.count = async () => {
  const totalBooking = await models.Booking.count();
  return totalBooking;
};
