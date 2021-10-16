const BlogPost = (sequelize, DataTypes) => {
  const BlogPostDefined = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
  });
  return BlogPostDefined;
};

BlogPost.associate = (models) => {
  BlogPost.belongsTo(models.User,
    { foreignKey: 'userId', as: 'users' });
};

module.exports = BlogPost;
