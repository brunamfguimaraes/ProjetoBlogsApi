const Categorie = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Categories',
    underscored: false,
  });

  category.associate = (models) => {
    category.hasMany(models.PostsCategorie,
      { foreignKey: 'id', as: 'categoryId' });
  };

  return category;
};

module.exports = Categorie;