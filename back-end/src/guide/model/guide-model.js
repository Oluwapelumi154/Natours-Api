module.exports = (sequelize, DataTypes) => {
  const guide = sequelize.define('Guide', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    guideId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['lead-guide', 'tour-guide']
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['male', 'female']
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['0', '1', '2'],
      defaultValue: '0'
    }
  });
  return guide;
};
