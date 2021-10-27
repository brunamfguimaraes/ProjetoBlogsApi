'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostsCategories', {
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
        primaryKey: true,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Categories',
          id: 'id',
        },
        primaryKey: true,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostsCategories');
  }
};