module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, defaultValue: 0, allowNull: false },
  },
  {
    timestamps: false,
    tableName: 'Categories',
  });

  // Category.associate = (models) => {
  //   Category.hasMany(models.PostsCategories,
  //     { foreignKey: 'categoryId', as: 'category' });
  // };

  return Category;
};
