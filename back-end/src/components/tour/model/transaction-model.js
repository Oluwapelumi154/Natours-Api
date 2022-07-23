module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cardNo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cvcNo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cardType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tranxId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    source: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['card', 'wallet']
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tourId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  transaction.associate = (models) => {
    transaction.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    transaction.belongsTo(models.Tour, {
      foreignKey: 'tourId'
    });
  };
  return transaction;
};
