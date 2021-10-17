const BlogPost = (sequelize, DataTypes) => {
  const BlogPostDefined = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  BlogPostDefined.associate = (models) => {
    BlogPostDefined.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
    BlogPostDefined.hasMany(models.PostsCategory,
      { foreignKey: 'id', as: 'postId' });
  };

  return BlogPostDefined;
};

module.exports = BlogPost;
