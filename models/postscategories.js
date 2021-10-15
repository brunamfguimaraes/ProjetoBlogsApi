const PostsCategorie = (sequelize, DataTypes) => {
  const postsCategories = sequelize.define('PostsCategorie', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  });

  return postsCategories;
};

module.exports = PostsCategorie;