const PostsCategories = (sequelize, _DataTypes) => {
  const postsCategories = sequelize.define('PostsCategorie',
  {},
  { timestamps: false });

  postsCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: postsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: postsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return postsCategories;
};

module.exports = PostsCategories;