const BlogPost = (sequelize, DataTypes) => {
  const blogpost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  { 
    timestamps: true,
    tableName: 'BlogPosts',
    createdAt: 'published',
    // Renomeando os Campos
    updatedAt: 'updated',
    // Renomeando os Campos
  });

  blogpost.associate = (models) => {
    blogpost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  return blogpost;
};

module.exports = BlogPost;
