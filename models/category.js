const Category = (sequelize, DataTypes) => {
  const categorieData = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {
    timestamps: false, tableName: 'Categories', 
  });

  return categorieData;
};

module.exports = Category; 