module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define('Image', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return image;
};
