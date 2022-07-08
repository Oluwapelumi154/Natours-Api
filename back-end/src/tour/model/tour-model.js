module.exports = (sequelize, DataTypes) => {
  const Tour = sequelize.define(
    'Tour',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      tourId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      maxGroupSize: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      difficulty: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['easy', 'medium', 'difficult'],
        defaultValue: 'easy'
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ratingsAverage: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: 4.5
      },
      ratingsQuantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      priceDiscount: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imageCover: {
        type: DataTypes.STRING,
        allowNull: false
      },
      secretTour: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
      //   statrtDates:
      // images
    },
    { timestamps: true }
  );
  return Tour;
};
