module.exports = (sequelize, _DataTypes) => {
  const postCategory = sequelize.define('postcategory', {}, { timestamps: false });
  
  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'BlogPost',
      through: postCategory,
      foreignKey: 'postId',
      otherKey: 'id',
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'Category',
      through: postCategory,
      foreignKey: 'CategoryId',
      otherKey: 'id',
    });
  };

  return postCategory;
};