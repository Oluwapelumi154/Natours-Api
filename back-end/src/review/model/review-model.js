module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  review.associate = (models) => {
    review.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return review;
};
