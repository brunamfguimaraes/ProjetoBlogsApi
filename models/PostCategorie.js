module.exports = (sequelize, _DataTypes) => {
  const PostCategorie = sequelize.define('PostCategorie',
    {},
    { timestamps: false });

  PostCategorie.associate = (models) => {
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostCategorie,
      foreignKey: 'categorie_id',
      otherKey: 'post_id',
    });
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: PostCategorie,
      foreignKey: 'post_id',
      otherKey: 'categorie_id',
    });
  };

  return PostCategorie;
};
