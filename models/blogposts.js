const BlogPost = (sequelize, DataTypes) => {
  const post = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, { timestamps: false });
  post.associate = (models) => {
    post.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user',
    });
  };
  return post;
};

module.exports = BlogPost;