const Categorie = (sequelize, DataTypes) => {
  const categories = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  });
  return categories;
};
module.exports = Categorie;