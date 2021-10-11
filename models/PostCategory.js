const {
  Model,
} = require('sequelize');

class PostsCategory extends Model {
  static associate(models) {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogposts',
      through: PostsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  }
}

module.exports = (sequelize, DataTypes) => {
  PostsCategory.init({
    postId: DataTypes.INTEGER, 
    categoryId: DataTypes.INTEGER, 
  }, {
    sequelize,
    timestamps: false,
    modelName: 'PostsCategory',
  });
  return PostsCategory;
};