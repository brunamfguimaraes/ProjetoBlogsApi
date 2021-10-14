module.exports = (sequelize, _DataTypes) => {
  const CategoryPost = sequelize.define('UserBook',
    {}, { timestamps: false });
    CategoryPost.associate = (models) => {
    models.Category.belongsToMany(models.Post, {
      as: 'posts',
      through: CategoryPost,
      foreignKey: 'category_id',
      otherKey: 'post_id',
    });
    models.Post.belongsToMany(models.Category, {
      as: 'categories',
      through: CategoryPost,
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });
  };
  return CategoryPost;
};
