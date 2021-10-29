const Categorie = (sequelize, DataTypes) => {
  const categorie = sequelize.define('Categories', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
  {
    timestamps: false, tableName: 'Categories',
  });
  return categorie;
};

module.exports = Categorie;