'use strict';
module.exports = {
up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable('PostsCategories', {
    categoryId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: 'Categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
},
    postId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: { model: 'BlogPosts', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  });
},
down: async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('PostsCategories');
}
};
