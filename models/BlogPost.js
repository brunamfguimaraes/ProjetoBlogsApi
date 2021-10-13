module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false, 
    tableName: 'BlogPosts',
  });

  BlogPost.associate = (models) => {
    BlogPost.belongToMany(models.User,
      { foreignKey: 'categoryId', as: 'users' });
  };

  return BlogPost;
};