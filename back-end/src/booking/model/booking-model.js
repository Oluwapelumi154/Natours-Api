module.exports = (sequelize, DataTypes) => {
  const booking = sequelize.define(
    'Booking',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      bookingId: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },

    { timestamps: true }
  );

  return booking;
};
