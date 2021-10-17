const PostsCategory = (sequelize, _DataTypes) => {
  const postscategory = sequelize.define('PostsCategory',
    {}, { timestamps: false });

  postscategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: postscategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogposts',
      through: postscategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return postscategory;
};

module.exports = PostsCategory;
