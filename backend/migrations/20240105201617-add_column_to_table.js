'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('notas', 'activa', {
      type: Sequelize.BOOLEAN,
      allowNull: false, 
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('notas', 'activa');
  }
};
