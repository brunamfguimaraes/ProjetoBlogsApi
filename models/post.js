const Post = (sequelize, DataTypes) => {
  const post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    // categoryIds: DataTypes.STRING,
    userId: DataTypes.STRING,
  }, { timestamps: false });
  return post;
};

module.exports = Post;