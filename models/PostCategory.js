module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategories', {},
  { timestamps: false });
  
  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'post',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategory;
};
