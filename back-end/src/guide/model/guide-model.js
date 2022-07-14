module.exports = (sequelize, DataTypes) => {
  const guide = sequelize.define(
    'Guide',
    {
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
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM,
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
      }
    },
    { timestamps: true }
  );
  return guide;
};
