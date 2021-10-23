module.exports = (sequelize, _DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {}, { timestamps: false });
  
  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'BlogPost',
      through: postCategory,
      foreignKey: 'CategoryId',
      otherKey: 'postId',
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'Category',
      through: postCategory,
      foreignKey: 'postId',
      otherKey: 'CategoryId',
    });
  };

  return postCategory;
};