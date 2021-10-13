'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const postCategoriesTable = queryInterface.createTable("PostsCategories", {
      postId: {
        type: Sequelize.INTEGER,
        field: 'postId',
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
        allownull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        field: 'categoryId',
        references: {
          model: 'Categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
    });

    return postCategoriesTable;
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("PostsCategories");
  }
};
