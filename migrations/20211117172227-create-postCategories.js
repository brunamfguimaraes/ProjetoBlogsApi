'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('PostsCategories', {
      postId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: { 
          model:'BlogPosts', 
          key: 'id' }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: { 
          model:'Categories', 
          key: 'id' }
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PostsCategories');
  }
};
