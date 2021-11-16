const Categorie = (sequelize, DataTypes) => {
  const categorie = sequelize.define({
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  return categorie;
};

module.exports = Categorie;
