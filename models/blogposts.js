const BlogPost = (sequelize, DataTypes) => {
  const BlogPostModel = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  }, {
    updatedAt: 'published',
    createdAt: 'updated',
  });

  BlogPostModel.associate = (models) => {
    BlogPostModel.belongsTo(models.User,
      { foreignKey: 'id', as: 'user' });
    BlogPostModel.hasMany(models.PostsCategorie,
      { foreignKey: 'postId', as: 'posts' });
  };
  return BlogPostModel;
};

module.exports = BlogPost;