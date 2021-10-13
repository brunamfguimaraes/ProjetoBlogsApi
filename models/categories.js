const Category = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Category',
    underscored: false,
  });

  return category;
};

module.exports = Category;