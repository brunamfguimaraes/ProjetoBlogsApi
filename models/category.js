module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Categories', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    },
    {
      underscored: true,
      tableName: 'Categories',
      timestamps: false,
    });

  return Category;
}; 
