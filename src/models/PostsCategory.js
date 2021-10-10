module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory', 
    {}, { timestamps: false, tableName: 'PostsCategories', underscore: true });

  PostsCategory.associate = (models) => {
    PostsCategory.belongsToMany(models.Category, { 
        as: 'categories', 
        through: PostsCategory,
        foreignKey: 'postId', 
        otherKey: 'categoryId', 
      });
    
    PostsCategory.belongsToMany(models.BlogPost, { 
      as: 'blogPosts',
      through: PostsCategory,
      foreignKey: 'categoryId', 
      otherKey: 'postId', 
    });
  };

  return PostsCategory;
};