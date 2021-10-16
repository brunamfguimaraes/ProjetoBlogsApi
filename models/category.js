const Category = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    // category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  return category;
};

module.exports = Category;
