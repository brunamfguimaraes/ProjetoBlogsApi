const PostsCategories = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, { timestamps: false });

  return User;
};

module.exports = PostsCategories;