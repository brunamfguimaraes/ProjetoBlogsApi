const PostsCategory = (sequelize, _DataTypes) => {
  const postCategory = sequelize.define('PostsCategories', {}, { timestamps: false });

  postCategory.associate = (models) => {
    postCategory.belongsToMany(models.Post, {
      foreignKey: 'id',
      through: postCategory,
      as: 'Post',
      otherKey: 'postId',
     });
    postCategory.belongsToMany(models.Category, {
      foreignKey: 'id',
      through: postCategory,
      as: 'Category',
      otherKey: 'categoriesId',
    });
  };

  return postCategory;
};

module.exports = PostsCategory;