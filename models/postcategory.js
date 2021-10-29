module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategories',
    {},
    { timestamps: false });

  PostCategory.associate = (models) => {
    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'BlogPosts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'Categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostCategory;
};