const PostsCategory = (sequelize, _DataTypes) => {
  const PostsCategoryDefined = sequelize.define('PostsCategory', 
  {},
  {
    timestamps: false,
  });
  return PostsCategoryDefined;
};

PostsCategory.associate = (models) => {
  models.BlogPost.belongsToMany(models.Category, {
    as: 'categories',
    through: PostsCategory,
    foreignKey: 'postId',
    otherKey: 'categoryId',
  });
  models.Category.belongsToMany(models.BlogPost, {
    as: 'posts',
    through: PostsCategory,
    foreignKey: 'categoryId',
    otherKey: 'postId',
  });
};

module.exports = PostsCategory;