const PostCategory = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories',
    {}, { timestamps: false });

    PostsCategories.associate = (models) => {
    models.Categories.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });

    models.BlogPost.belongsToMany(models.Categories, {
      as: 'categories',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };
  return PostsCategories;
};

module.exports = PostCategory;