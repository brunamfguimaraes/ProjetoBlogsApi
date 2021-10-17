const BlogPosts = (sequelize, DataTypes) => {
  const PostModel = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  },
  {
    timestamps: false,
    creatAt: 'published',
    updateAt: 'updated',
  });
  PostModel.associate = (models) => {
    PostModel.belongsTo(models.User, {
      foreignkey: 'userId',
      as: 'user',
    });
  };

  return PostModel;
};

module.exports = BlogPosts;
