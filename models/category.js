const Category = (sequelize, DataTypes) => {
  const CategoryDefined = sequelize.define('Category', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  return CategoryDefined;
};

module.exports = Category;