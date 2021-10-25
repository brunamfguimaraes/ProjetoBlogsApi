const BlogPost = (sequelize, DataTypes) => {
  const blog = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    updated: DataTypes.DATE,
    published: DataTypes.DATE,
  }, {
    timestamps: false });

  blog.associate = (models) => {
    blog.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  return blog;
};

module.exports = BlogPost;