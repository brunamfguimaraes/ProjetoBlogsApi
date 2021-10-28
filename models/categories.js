const Categorie = (sequelize, DataTypes) => {
  const CategorieModel = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  CategorieModel.associate = (models) => {
    CategorieModel.hasMany(models.PostsCategorie,
    { foreignKey: 'categoryId', as: 'categories' });
  };
  return CategorieModel;
};

module.exports = Categorie;