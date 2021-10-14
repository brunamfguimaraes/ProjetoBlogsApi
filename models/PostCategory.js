const PostCategory = (sequelize, _DataTypes) => {
    const postCategory = sequelize.define('UserBook',
      {},
      { timestamps: false });
  
    PostCategory.associate = (models) => {
      models.BlogPost.belongsToMany(models.User, {
        as: 'BlogPosts',
        through: 'PostCategory',
        foreignKey: 'userId',
        otherKey: 'id',
      });
      models.Categorie.hasMany(models.PostCategory, {
        as: 'Categories',
        through: 'PostCategory',
        foreignKey: 'categoryId',
        otherKey: 'id',
      });
    };
  
    return postCategory;
  };

module.exports = PostCategory;