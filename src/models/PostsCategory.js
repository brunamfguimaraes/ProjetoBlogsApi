const PostsCategory = (sequelize, _DataTypes) => {
  const postCategory = sequelize.define('PostsCategory', {}, { timestamps: false });

  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'categoryId',
      through: postCategory,
      as: 'categories',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'id',
      through: postCategory,
      as: 'blogPosts',
      otherKey: 'postId',
     });
  };

  return postCategory;
};

module.exports = PostsCategory;