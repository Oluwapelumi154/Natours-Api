module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Guides',
        'imgUrl',
        {
          type: Sequelize.STRING,
          allowNull: true
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'Guides',
        'tourId',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Tour',
            key: 'id'
          }
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface) {
    // await queryInterface.dropTable('Guides');
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Guides', 'imgUrl');
      await queryInterface.removeColumn('Guides', 'tourId');
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  }
};
