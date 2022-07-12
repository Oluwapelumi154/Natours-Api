module.exports = (sequelize, DataTypes) => {
  const date = sequelize.define('startDate', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });
  return date;
};
