const Categorie = (sequelize, DataTypes) => {
  const categorie = sequelize.define('Categories', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false, tableName: 'Categories',
  });
  return categorie;
};

module.exports = Categorie;