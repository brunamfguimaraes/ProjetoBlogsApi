const BlogPost = (sequelize, dataType) => {
  const blogPost = sequelize.define('BlogPost', {
  id: { type: dataType.INTEGER, primaryKey: true, autoIncrement: true },
  title: dataType.STRING,
  content: dataType.STRING,
  userId: { type: dataType.INTEGER, foreignKey: true },
  published: dataType.DATE,
  updated: dataType.DATE,
  },
  { timestamp: false });
  blogPost.associate = (model) => {
    blogPost.belongsTo(model.User, {
      foreignKey: 'userId', as: 'User',
    });
  };
  return blogPost;
};

module.exports = BlogPost;