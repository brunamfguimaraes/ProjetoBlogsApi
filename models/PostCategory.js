const {
  Model,
} = require('sequelize');

class PostCategory extends Model {
  static associate(models) {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogposts',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  }
}

module.exports = (sequelize, DataTypes) => {
  PostCategory.init({
    postId: DataTypes.INTEGER, 
    categoryId: DataTypes.INTEGER, 
  }, {
    sequelize,
    timestamps: false,
    underscored: true,
  });
  return PostCategory;
};