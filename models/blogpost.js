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
  return BlogPostDefined;
};

BlogPost.associate = (models) => {
  BlogPost.belongsTo(models.User,
    { foreignKey: 'userId', as: 'users' });
};

module.exports = BlogPost;
