module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
    {},
    { timestamps: false, tableName: 'PostsCategories' });

  PostCategory.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'blogpost',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategory;
};