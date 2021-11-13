module.exports = {
  up: async (queryInterface, Seq) => {
    await queryInterface.createTable('PostsCategories', {
      postId: {
        type: Seq.INTEGER,
        references: {
          model: { tableName: 'BlogPosts' },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },

      categoryId: {
        type: Seq.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      }
    })
  },

  down: async (queryInterface, Seq) => {
    await queryInterface.dropTable('PostsCategories')
  }
};
