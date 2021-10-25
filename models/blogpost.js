const BlogPost = (sequelize, DataTypes) => {
  const BlogPostModel = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    updatedAt: 'published',
    createdAt: 'updated',
  });

  return BlogPostModel;
};

module.exports = BlogPost;