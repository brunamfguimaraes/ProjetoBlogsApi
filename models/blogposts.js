const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    categoryIds: DataTypes.STRING,
    // userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
    tableName: 'BlogPosts',
    underscored: false,
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, { foreignKey: 'id', as: 'user' });
    blogPost.hasMany(models.PostCategory, { foreignKey: 'id', as: 'postId' });
  };

  return blogPost;
};

module.exports = BlogPost;