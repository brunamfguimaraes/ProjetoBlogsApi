const BlogPosts = (sequelize, DataTypes) => {
  const users = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.STRING,
    updated: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  return users;
};

module.exports = BlogPosts;