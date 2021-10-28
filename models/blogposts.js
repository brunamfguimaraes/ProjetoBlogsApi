const BlogPost = (sequelize, DataTypes) => {
  const BlogPostModel = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    updatedAt: 'published',
    createdAt: 'updated',
  });

  BlogPostModel.associate = (models) => {
    BlogPostModel.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
    BlogPostModel.hasMany(models.PostsCategorie,
      { foreignKey: 'postId', as: 'posts' });
  };
  return BlogPostModel;
};

module.exports = BlogPost;