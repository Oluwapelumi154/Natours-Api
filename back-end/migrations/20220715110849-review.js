module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Reviews',
        'userId',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'Reviews',
        'tourId',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Reviews',
            key: 'id'
          }
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'Reviews',
        'rating',
        {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Reviews');

    // const transaction = await queryInterface.sequelize.transaction();
    // try {
    //   await queryInterface.removeColumn('Reviews', 'userId', { transaction });
    // } catch (err) {
    //   await transaction.rollback();
    // }
  }
};
