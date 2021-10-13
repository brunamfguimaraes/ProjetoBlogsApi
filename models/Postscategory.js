const PostsCategory = (sequelize) => {
  const postCategory = sequelize.define('PostsCategory', {}, { timestamps: false });
  postCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: postCategory,
      foreignKey: 'category_id',
      otherKey: 'post_id',
    });
    models.Blogpost.belongsToMany(models.Category, {
      as: 'categories',
      through: postCategory,
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });
  };
  return postCategory;
};

module.exports = PostsCategory;