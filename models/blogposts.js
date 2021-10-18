const BlogPost = (sequelize, DataTypes) => {
  const post = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, { timestamps: false });
  return post;
};

module.exports = BlogPost;