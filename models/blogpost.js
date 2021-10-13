const BlogPost = (sequelize, DataTypes) => {
  const blogpost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  });
  BlogPost.associate = (models) => {
    BlogPost.belongsToMany(models.User,
      { foreignKey: '', as: '' });
  };
  return blogpost;
};

module.exports = BlogPost;