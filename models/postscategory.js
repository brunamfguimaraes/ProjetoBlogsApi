const PostsCategory = (sequelize, _DataTypes) => {
  const posts = sequelize.define('PostsCategory', {},
    { timestamps: false, tableName: 'PostsCategories' });

  posts.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: posts,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'post',
      through: posts,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return posts;
}; 

module.exports = PostsCategory;