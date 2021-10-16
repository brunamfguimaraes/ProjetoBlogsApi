const Category = (sequelize, DataTypes) => {
  const CategoryDefined = sequelize.define('Category', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Categories',
    underscored: true,
  });
  return CategoryDefined;
};

module.exports = Category;