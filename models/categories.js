const Categories = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING
  }, { timestamps: false });

  return Categories;
};

module.exports = Categories;
