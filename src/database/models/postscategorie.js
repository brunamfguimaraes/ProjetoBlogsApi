const PostsCategories = (sequelize, DataTypes) => {
  const postsCategories = sequelize.define('PostsCategories', {
    categoryId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
  }, {
    timestamps: false,
  });
  return postsCategories;
};

module.exports = PostsCategories;
