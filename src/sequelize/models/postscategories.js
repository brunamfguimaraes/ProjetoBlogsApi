const PostsCategorie = (sequelize, _DataTypes) => {
  const postsCategories = sequelize.define('PostsCategorie',
  {}, { timestamps: false, tableName: 'PostsCategories' });

  postsCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: postsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: postsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return postsCategories;
};

module.exports = PostsCategorie;
