module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
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
      role: {
        type: DataTypes.ENUM,
        values: ['user', 'lead-guide', 'tour-guide', 'admin'],
        defaultValue: 'user'
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['0', '1', '2'],
        defaultValue: '0'
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      passwordChangedAt: DataTypes.DATE,
      resetToken: {
        type: DataTypes.STRING,
        allowNull: true
      },
      resetTokenExp: { type: DataTypes.DATE, allowNull: true }
    },
    {
      timestamps: true,
      paranoid: true
    }
  );
  // User.associate = (models) => {
  //   User.hasMany(models.Tour, {
  //     foreignKey: 'userId',
  //     onDelete: 'CASCADE'
  //   });
  // };

  return User;
};
