const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {
      underscored: true,
      tableName: 'BlogPosts',
    });
    blogPost.associate = (models) => {
      blogPost.belongsTo(models.User,
        { foreignKey: 'user_id', as: 'users' });
    };
  return blogPost;
};

module.exports = BlogPost;