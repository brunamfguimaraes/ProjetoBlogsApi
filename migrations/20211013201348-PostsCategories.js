'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostsCategoriesTable = queryInterface.createTable('PostsCategories', {
      postId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

    return PostsCategoriesTable;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostsCategories')
  }
};
