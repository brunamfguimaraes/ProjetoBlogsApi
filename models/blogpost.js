const BlogPost = (sequelize, DataTypes) => {
  const BlogPostModel = sequelize.define('BlogPost', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  { timestamps: false });

  BlogPostModel.associate = (models) => {
    BlogPostModel.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  return BlogPostModel;
};

module.exports = BlogPost;