const Post = (sequelize, _DataTypes) => {
  const postscategorie = sequelize.define('PostsCategorie', 
  {},
  { timestamp: false, tableName: 'PostsCategories' });

  postscategorie.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: postscategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogposts',
      through: postscategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return postscategorie;
};

module.exports = Post;