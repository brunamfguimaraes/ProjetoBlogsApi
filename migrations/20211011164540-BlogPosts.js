'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const blog = queryInterface.createTable("BlogPosts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING, 
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      published: {
        allowNull: false,
        type: Sequelize.STRING, 
      },
      updated: {
        allowNull: false,
        type: Sequelize.STRING, 
      },
    })
  },

  down: async (queryInterface, _Sequelize) => {
    queryInterface.dropTable("BlogPosts");
  }
};
