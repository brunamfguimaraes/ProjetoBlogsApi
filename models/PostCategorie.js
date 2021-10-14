module.exports = (sequelize, _DataTypes) => {
  const PostCategorie = sequelize.define('PostCategorie', {},
    { timestamps: false });
  PostCategorie.associate = (models) => {
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: PostCategorie,
      foreignKey: 'categorie_id',
      otherKey: 'blogPost_id',
    });
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: PostCategorie,
      foreignKey: 'blogPost_id',
      otherKey: 'categorie_id',
    });
  };
  return PostCategorie;
};