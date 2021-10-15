const CategorieModel = (sequelize, DataTypes) => {
    const Categorie = sequelize.define('Categorie', {
      name: DataTypes.STRING,
    },
    {
      timestamps: true,
      tableName: 'categories',
    });
  
    return Categorie;
};
module.exports = CategorieModel;