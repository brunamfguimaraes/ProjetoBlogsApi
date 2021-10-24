const BlogPosts = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, { timestamps: false });

  return BlogPosts;
};

module.exports = BlogPosts;
