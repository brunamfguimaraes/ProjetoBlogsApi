const createPostCategorie = (sequelize, _DataTypes) => {
  const PostCategorie = sequelize.define('PostsCategorie',
  {}, { timestamps: false, tableName: 'PostsCategories' });
  PostCategorie.associate = (models) => {
    models.Categorie.belongsToMany(models.BlogPost, 
    { as: 'BlogPosts',
      through: PostCategorie,
      foreignKey: 'categoryId',
      outherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Categorie, 
    {
      as: 'Categorie',
      through: PostCategorie,
      foreignKey: 'postId',
      outherKey: 'categoryId',
    });
  };
  return PostCategorie;
};

module.exports = createPostCategorie;