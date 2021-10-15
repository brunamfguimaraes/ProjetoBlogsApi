const Category = (sequelize, DataTypes) => {
  const myCategory = sequelize.define(
    'Category',
    {
      name: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'Categories',
    },
  );

  return myCategory;
};

module.exports = Category;