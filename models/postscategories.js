const PostsCategorie = (sequelize, _DataTypes) => {
  const postsCategories = sequelize.define('PostsCategorie', {}, { timestamps: false });
    // postId: DataTypes.INTEGER,
    // categoryId: DataTypes.INTEGER,

  postsCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: postsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'post',
      through: postsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return postsCategories;
};

module.exports = PostsCategorie;