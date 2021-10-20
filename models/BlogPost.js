const BlogPost = (sequelize, DataTypes) => {
  const insertBlogPosts = sequelize.define('BlogPost',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
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
