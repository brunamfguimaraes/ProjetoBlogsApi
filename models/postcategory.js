const PostCategory = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  });
  PostCategory.associate = (models) => {
    PostCategory.belongsToMany(models.BlogPost,
      { as: 'blogpost', through: PostCategory, foreignKey: 'postId', otherKey: 'id' });
  };
  PostCategory.associate = (models) => {
    PostCategory.belongsToMany(models.Category,
      { 
        as: 'category',
        through: PostCategory,
        foreignKey: 'categoryId',
        otherKey: 'id',
      });
  };

  return postCategory;
};

module.exports = PostCategory;