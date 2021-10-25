module.exports = (sequelize, _DataTypes) => {
  const PosCategorie = sequelize.define('PostCategorie',
    {},
    { timestamps: false });

  PosCategorie.associate = (models) => {
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'blogposts',
      through: PosCategorie,
      foreignKey: 'categorie_id',
      otherKey: 'blogpost_id',
    });
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: PosCategorie,
      foreignKey: 'blogpost_id',
      otherKey: 'categorie_id',
    });
  }; 

  return PosCategorie;
};