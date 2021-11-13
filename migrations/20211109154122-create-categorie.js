'use strict';
module.exports = {
  up: async (queryInterface, Seq) => {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Seq.INTEGER
      },
      name: {
        allowNull: false,
        type: Seq.STRING
      },
    });
  },
  down: async (queryInterface, Seq) => {
    await queryInterface.dropTable('Categories');
  }
};
