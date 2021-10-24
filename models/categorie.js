const Categorie = (sequelize, DataTypes) => {
  const table = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  },
  { timestamps: false });

  return table;
};

module.exports = Categorie;