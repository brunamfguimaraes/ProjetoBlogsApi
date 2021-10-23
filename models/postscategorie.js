const Post = (sequelize, _DataTypes) => {
  const postscategorie = sequelize.define('PostsCategorie', 
  {},
  { timestamp: false });

  postscategorie.associate = (models) => {
    models.BlogPost.belongsToMany(models.User, {
      as: 'users',
      through: postscategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.User.belongsToMany(models.BlogPost, {
      as: 'blogposts',
      through: postscategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return postscategorie;
};

module.exports = Post;