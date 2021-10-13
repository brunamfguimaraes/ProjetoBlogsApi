// models/UserBook.js
module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory',
    {},
    { timestamps: false });

    PostsCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'postId', 
      through: PostsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categoryId',
      through: PostsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId', 
    });
  };

  return PostsCategory;
};