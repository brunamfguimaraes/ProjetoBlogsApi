const BlogPost = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, { timestamps: false });

  blogPosts.associate = (models) => {
    blogPosts.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user',
    });
  };

  return blogPosts;
};

module.exports = BlogPost;