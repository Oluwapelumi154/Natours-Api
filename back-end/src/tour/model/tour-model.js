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
        allowNull: false,
        unique: true
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
      durations: {
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
      startLocation: {
        type: DataTypes.GEOMETRY('POINT')
      }
    },
    { timestamps: true, paranoid: true }
  );
  Tour.associate = (models) => {
    // Tour.hasMany(models.Images, {
    //   foreignKey: 'tourId',
    //   onDelete: 'CASCADE'
    // });
    // Tour.hasMany(models.Review, {
    //   foreignKey: 'tourId',
    //   onDelete: 'CASCADE'
    // });
    Tour.hasMany(models.startDate, {
      foreignKey: 'tourId',
      onDelete: 'CASCADE'
    });
    Tour.hasMany(models.Booking, {
      foreignKey: 'tourId',
      onDelete: 'CASCADE'
    });
    // Tour.hasMany(models.Guide, {
    //   foreignKey: 'tourId',
    //   onDelete: 'CASCADE'
    // });
  };
  return Tour;
};
