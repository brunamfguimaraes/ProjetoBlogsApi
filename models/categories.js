module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Categories',
    underscored: false,
  });
  Categories.associate = (models) => {
    Categories.hasMany(models.PostCategory,
      { foreignKey: 'id', as: 'categoryId' });
  };

  return Categories;
};