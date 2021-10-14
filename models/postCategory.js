module.exports = (sequelize, _DataTypes) => {
  const postCategory = sequelize.define('postcategory', {}, { timestamps: false });
  
  postCategory.associate = (models) => {
    models.blogPost.belongsToMany(models.category, {
      as: 'BlogPost',
      through: postCategory,
      foreignKey: 'postId',
      otherKey: 'id',
    });

    models.category.belongsToMany(models.blogPost, {
      as: 'Category',
      through: postCategory,
      foreignKey: 'CategoryId',
      otherKey: 'id',
    });
  };

  return postCategory;
};