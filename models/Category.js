const Category = (sequelize, DataTypes) => sequelize.define('Category', {
  name: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Categories',
  });

module.exports = Category;