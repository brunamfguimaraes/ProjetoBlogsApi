const BlogPost = (sequelize, DataTypes) => {
  const insertBlogPosts = sequelize.define('BlogPost',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    { timestamps: false });

  insertBlogPosts.associate = (models) => {
    insertBlogPosts.belongsTo(models.User,
      {
        foreignKey: 'userId', as: 'user',
      });
  };

  return insertBlogPosts;
};

module.exports = BlogPost;
