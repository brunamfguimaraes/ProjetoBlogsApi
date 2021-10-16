module.exports = (sequelize, _DataTypes) => {
  const postCategory = sequelize.define('PostsCategory', {},
  { timestamps: false });

  postCategory.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'categories',
      through: postCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'posts',
      through: postCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return postCategory;
};
