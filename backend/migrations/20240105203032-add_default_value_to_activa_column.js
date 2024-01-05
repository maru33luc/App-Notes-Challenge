'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('notas', 'activa', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true, 
    });

    await queryInterface.sequelize.query(`
      UPDATE notas
      SET activa = CASE WHEN activa = 1 THEN true ELSE false END;
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('notas', 'activa', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    });
  }
};
