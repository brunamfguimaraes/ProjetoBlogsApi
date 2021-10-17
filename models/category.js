const Category = (sequelize, DataTypes) => {
  const CategoryDefined = sequelize.define('Category', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  CategoryDefined.associate = (models) => {
    CategoryDefined.hasMany(models.PostsCategory,
      { foreignKey: 'id', as: 'categoryId' });
  };
  
  return CategoryDefined;
};

module.exports = Category;