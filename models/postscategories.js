const PostsCategories = (sequelize, _DataTypes) => {
  const postsCategories = sequelize.define('PostsCategories', {

  }, { timestamps: false });

postsCategories.associate = (models) => {
  models.BlogPost.belongsToMany(models.Category, {
    as: 'categories',
    through: postsCategories,
    foreignKey: 'postId',
    otherKey: 'categoryId',
  });
  models.Category.belongsToMany(models.BlogPost, {
    as: 'blogpost',
    through: postsCategories,
    foreignKey: 'categoryId',
    otherKey: 'postId',
  });
};

  return postsCategories;
};

module.exports = PostsCategories;