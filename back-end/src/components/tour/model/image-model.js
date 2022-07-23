module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define('Image', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    imgId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tourId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return image;
};
