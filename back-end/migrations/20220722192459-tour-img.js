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
            model: 'Tour'
          }
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'Images',
        'imgId',
        {
          type: Sequelize.STRING,
          allowNull: false
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
    await queryInterface.dropTable('Images');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
