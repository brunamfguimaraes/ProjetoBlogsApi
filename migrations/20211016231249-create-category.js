'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Categories');
  }
};