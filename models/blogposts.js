const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      }, { timestamps: false });
      blogPost.associate = (models) => {
      blogPost.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user',
      });
      };

  return blogPost;
};

module.exports = BlogPost;