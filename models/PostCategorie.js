const createPostCategorie = (sequelize, _DataTypes) => {
  const PostCategorie = sequelize.define('PostCategorie',
  {}, { timestamps: false, tableName: 'PostsCategories' });
  PostCategorie.associate = (models) => {
    models.Categorie.belongsToMany('BlogPost', 
    { as: 'BlogPost',
      through: PostCategorie,
      foreignKey: 'categoryId',
      outherKey: 'postId',
    });
    models.BlogPost.belongsToMany('Categorie', 
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