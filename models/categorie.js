const Categorie = (sequelize, DataTypes) => {
  const table = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  },
  { timestamp: false });

  return table;
};

module.exports = Categorie;