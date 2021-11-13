'use strict';
module.exports = {
  up: async (queryInterface, Seq) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Seq.INTEGER
      },
      displayName: {
        allowNull: false,
        type: Seq.STRING
      },
      email: {
        allowNull: false,
        type: Seq.STRING
      },
      password: {
        allowNull: false,
        type: Seq.STRING
      },
      image: {
        type: Seq.STRING
      },
      createdAt: {
        allowNull: false,
        type: Seq.DATE,
        defaultValue: Seq.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Seq.DATE,
        defaultValue: Seq.literal('CURRENT_TIMESTAMP'),
      }
    });
  },
  down: async (queryInterface, Seq) => {
    await queryInterface.dropTable('Users');
  }
};
