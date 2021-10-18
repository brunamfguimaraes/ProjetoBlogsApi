const Post = (sequelize, DataTypes) => {
  const insertPost = sequelize.define('Post',
  {
    title: DataTypes.STRING,
  },
  {
    content: DataTypes.STRING,
  },
  {
    categoryIds: DataTypes.INTEGER,
  },
  {
    timestamps: false, tableName: 'PostsCategories',
  });

  return insertPost;
};

module.exports = {
  Post,
};
