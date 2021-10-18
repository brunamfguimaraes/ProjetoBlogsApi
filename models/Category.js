const Category = (sequelize, DataTypes) => {
  const insertCategory = sequelize.define('Category',
    {
      name: DataTypes.STRING,
    },
    {
      timestamps: false, tableName: 'Categories',
    });
  
  return insertCategory;
};

module.exports = Category;
