module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory',
    {},
    { timestamps: false });

  PostsCategory.associate = (models) => {
    models.Blogpost.belongsToMany(models.User, { // pertence
      as: 'users',
      through: PostsCategory,
      foreignKey: 'userId',
      otherKey: 'id',
    });

    models.Category.belongsToMany(models.PostsCategory, {
      as: 'category',
      through: PostsCategory,
      foreignKey: 'categoryId',
      otherKey: 'id',
    });
  };

  return PostsCategory;
};