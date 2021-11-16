const PostsCategories = (sequelize, DataTypes) => {
  const postsCategories = sequelize.define('PostsCategories', {
    categoryId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
  }, {
    timestamps: false,
    underscored: true,
  });
  return postsCategories;
};

module.exports = PostsCategories;
