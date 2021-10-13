const Category = (sequelize, DataTypes) => {
  const CategoryIn = sequelize.define('Category', {
    name: DataTypes.STRING,
  },
  { timestamps: false, tableName: 'Categories' });

  return CategoryIn;
};

module.exports = Category;