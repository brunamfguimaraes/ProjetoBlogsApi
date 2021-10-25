const PostsCategories = (sequelize, _DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {}, {
    timestamps: false, tableName: 'PostsCategories', underscored: false,
    });
  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: postCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: postCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return postCategory;
};

module.exports = PostsCategories;