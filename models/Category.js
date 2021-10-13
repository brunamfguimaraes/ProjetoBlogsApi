const Category = (sequelize, dataType) => sequelize.define('Category', {
  id: { type: dataType.INTEGER, primaryKey: true, autoIncrement: true },
  name: dataType.STRING,
  });

module.exports = Category;