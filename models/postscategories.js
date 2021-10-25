const PostsCategory = (sequelize, _DataTypes) => {
  const Posts = sequelize.define('PostsCategory', {},
    { timestamps: false, tableName: 'PostsCategories' });

  Posts.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: Posts,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'post',
      through: Posts,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return Posts;
}; 

module.exports = PostsCategory;
