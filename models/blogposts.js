const BlogPost = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, { timestamps: false });
  return blogPosts;
};

module.exports = BlogPost;