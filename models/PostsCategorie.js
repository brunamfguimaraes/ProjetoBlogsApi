module.exports = (sequelize, _DataTypes) => {
  const PostsCategorie = sequelize.define('PostsCategorie',
    {},
    { timestamps: false });

  PostsCategorie.associate = (models) => {
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostsCategorie,
      foreignKey: 'categorie_id',
      otherKey: 'post_id',
    });
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: PostsCategorie,
      foreignKey: 'post_id',
      otherKey: 'categorie_id',
    });
  };

  return PostsCategorie;
};
