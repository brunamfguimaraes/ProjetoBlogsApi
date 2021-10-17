const PostsCategory = (sequelize, _DataTypes) => {
  const PostsCategoryDefined = sequelize.define('PostsCategory', 
  {},
  { timestamps: false });

  PostsCategoryDefined.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostsCategoryDefined,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostsCategoryDefined,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  
  return PostsCategoryDefined;
};

module.exports = PostsCategory;