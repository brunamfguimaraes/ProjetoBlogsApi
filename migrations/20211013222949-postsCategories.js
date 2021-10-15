'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostsCategoriesTable = queryInterface.createTable('PostsCategories', {
      postId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onUpdate:'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        onUpdate:'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
    })

    return PostsCategoriesTable;
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PostsCategories');
  }
};
