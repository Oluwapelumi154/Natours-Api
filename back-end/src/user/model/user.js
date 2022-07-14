module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    // role: DataTypes.ENUM,
    gender: DataTypes.STRING,
    password: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['0', '1', '2'],
      defaultValues: '0'
    },
    passwordChangedAt: DataTypes.DATE,
    resetToken: DataTypes.STRING,
    resetTokenExp: DataTypes.DATE
  });
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  // user.associate = (models) => {};
  // define association here

  return user;
};
