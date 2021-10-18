const Categorie = (sequelize, DataTypes) => {
  const cat = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  }, {
    timestamps: false, tableName: 'Categories', 
  });

  return cat;
};

module.exports = Categorie;