const Categorie = (sequelize, DataTypes) => {
  const categorieData = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  }, {
    timestamps: false, tableName: 'Categories', 
  });

  return categorieData;
};

module.exports = Categorie; 