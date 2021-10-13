const Categories = (sequelize, DataTypes) => {
  const category = sequelize.define(
    'Categories',
    {
      name: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );
  return category;
};

module.exports = Categories;