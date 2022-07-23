module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Bookings',
        {
          userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Users'
            }
          }
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'Bookings',
        {
          tourId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Tours'
            }
          }
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'price',
        {
          tourId: {
            type: Sequelize.INTEGER,
            allowNull: false
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
    queryInterface.dropTable('Bookings');
    // const transaction = await queryInterface.sequelize.transaction();
    // try {
    //   await queryInterface.removeColumn('Bookings', 'userId');
    //   await queryInterface.removeColumn('Bookings', 'tourId');
    //   transaction.commit();
    // } catch (err) {
    //   transaction.rollback();
    // }
    /**
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
