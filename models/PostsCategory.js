module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory',
    {},
    { timestamps: false });

    PostsCategory.associate = (models) => {
      models.BlogPost.belongsToMany(models.BlogPost, { // pertence
        as: 'Category',
        through: PostsCategory,
        foreignKey: 'categoryId',
        otherKey: 'id',
      });
  
      models.Category.belongsToMany(models.Category, {
        as: 'BlogPost',
        through: PostsCategory,
        foreignKey: 'postId',
        otherKey: 'id',
      });
    };
  
    return PostsCategory;
  }; 