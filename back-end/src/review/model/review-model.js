module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    review: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });
  review.associate = (models) => {
    review.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    review.belongsTo(models.Tour, {
      foreignKey: 'userId'
    });
  };
  return review;
};
