const Categories = (sequelize, DataTypes) => {
  const categ = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  return categ;
};

module.exports = Categories;