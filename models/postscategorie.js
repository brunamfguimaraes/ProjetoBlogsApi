const Post = (sequelize, _DataTypes) => {
  const postscategorie = sequelize.define('PostsCategorie', 
  {},
  { timestamp: false, tableName: 'PostsCategories' });

  postscategorie.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: postscategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'blogposts',
      through: postscategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return postscategorie;
};

module.exports = Post;