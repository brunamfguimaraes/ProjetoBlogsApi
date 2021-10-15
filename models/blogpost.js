module.exports = (sequelize, DataTypes) => {
  const blogpost = sequelize.define('Blogpost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    categoryIds: DataTypes.INTEGER,
  }, { timestamps: false, tableName: 'blogposts' });

  return blogpost;
};