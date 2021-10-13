const createCategory = (sequelize, DataTypes) => {
  const Category = sequelize.define('Categorie',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  }, { timestamps: false, tableName: 'Categories' });
  return Category;
};

module.exports = createCategory;