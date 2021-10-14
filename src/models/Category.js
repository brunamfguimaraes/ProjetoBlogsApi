const Category = (sequelize, DataTypes) => {
  const myCategory = sequelize.define(
    'Category',
    {
      name: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );

  return myCategory;
};

module.exports = Category;