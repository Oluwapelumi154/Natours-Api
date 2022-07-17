module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Images',
        'tourId',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Tours',
            key: 'id'
          }
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'Images',
        'imageId',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Tours',
            key: 'id'
          }
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Images', 'tourId');
    } catch (err) {
      await transaction.rollback();
    }
  }
};
