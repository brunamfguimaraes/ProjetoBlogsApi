const Categorie = (sequelize, DataTypes) => {
  const categorie = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  return categorie;
};

module.exports = Categorie;
