const Categorie = (sequelize, DataTypes) => {
  const categorieModel = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  return categorieModel;
};

module.exports = Categorie;
