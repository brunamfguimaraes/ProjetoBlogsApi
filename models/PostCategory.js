module.exports = (sequelize, _DataTypes) => {
    const PostCategory = sequelize.define('PostCategory',
      {},
      { timestamps: false });
  
    PostCategory.associate = (models) => {
      models.BlogPost.belongsToMany(models.Categorie, {
        as: 'Category',
        through: PostCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
      models.Categorie.belongsToMany(models.BlogPost, {
        as: 'BlogPost',
        through: PostCategory,
        foreignKey: 'categoryId',
        otherKey: 'postId',
      });
    };
  
    return PostCategory;
  };
