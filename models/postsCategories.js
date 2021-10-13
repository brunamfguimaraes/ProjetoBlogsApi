// models/UserBook.js
module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories',
    {},
    { timestamps: false });

  PostsCategories.associate = (models) => {
    models.Category.belongsToMany(models.BlogPosts, {
      as: 'postId', 
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.BlogPosts.belongsTo(models.Category, {
      as: 'categoryId',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId', 
    });
  };

  return PostsCategories;
};