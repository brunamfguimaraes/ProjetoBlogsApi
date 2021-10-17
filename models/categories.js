module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('category', {
    name: DataTypes.STRING,

  });

  return categories;
};