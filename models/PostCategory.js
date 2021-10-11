const {
  Model,
} = require('sequelize');

class PostsCategory extends Model {
  static associate(models) {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogposts',
      through: PostsCategory,
      foreignKey: 'id',
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
    id: { type: DataTypes.INTEGER, primaryKey: true },
    postId: DataTypes.INTEGER, 
    categoryId: DataTypes.INTEGER, 
  }, {
    sequelize,
    tableName: 'PostsCategories',
    timestamps: false,
  });
  return PostsCategory;
};