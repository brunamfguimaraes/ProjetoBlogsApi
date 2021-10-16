module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostsCategory',
    { timestamps: false });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'postId',
      through: PostCategory,
      foreignKey: 'user_id',
      otherKey: 'postId',
    });
  };

  return PostCategory;
};