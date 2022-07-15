module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: DataTypes.ENUM,
        values: ['male', 'female'],
        defaultValue: 'male',
        allowNull: true
      },
      password: { type: DataTypes.STRING, allowNull: false },
      status: {
        type: DataTypes.ENUM,
        values: ['0', '1', '2'],
        defaultValue: '0',
        allowNull: false
      },
      passwordChangedAt: { type: DataTypes.DATE, allowNull: true },
      resetToken: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      maxGroupSize: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      resetTokenExp: { type: DataTypes.DATE, allowNull: true }
    },
    { timestamps: true }
  );
  // define association here
  user.associate = (models) => {
    user.hasMany(models.Booking, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };

  return user;
};
