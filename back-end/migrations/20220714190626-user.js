module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Users',
        'data',
        {
          type: Sequelize.STRING,
          allowNull: true
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'Users',
        'height',
        {
          type: Sequelize.STRING,
          allowNull: true
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
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Users', 'data', { transaction });
      await queryInterface.removeColumn('Users', 'height', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
