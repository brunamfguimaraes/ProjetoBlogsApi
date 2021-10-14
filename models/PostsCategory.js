const PostsCategory = (sequelize) => {
  const postCategory = sequelize.define('PostsCategory', {}, { timestamps: false });
  postCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: postCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: postCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };
  return postCategory;
};

module.exports = PostsCategory;