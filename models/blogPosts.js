const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    categoryIds: DataTypes.STRING, // Array ou string ???
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
    tableName: 'BlogPosts',
    underscored: false,
  });

  BlogPost.associate = (models) => {
    BlogPost.hasOne(models.User,
      { foreignKey: 'id', as: 'userId' });
  };

  return blogPost;
};

module.exports = BlogPost;