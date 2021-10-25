const Category = (sequelize, DataTypes) => {
  const cat = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {
    timestamps: false, tableName: 'Categories', 
  });

  return cat;
};

module.exports = Category;