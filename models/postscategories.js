module.exports = (sequelize, DataTypes) => {
  const PostsCategories = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, {
    timestamps: false,
    tableName: 'PostsCategories',
    underscored: false,
  });
  
  return PostsCategories;
};