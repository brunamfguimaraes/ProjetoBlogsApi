const Category = (sequelize, dataType) => sequelize.define('Category', {
  id: { type: dataType.INTEGER, primaryKey: true, autoIncrement: true },
  name: dataType.STRING,
  },
  { timestamps: false });

module.exports = Category;