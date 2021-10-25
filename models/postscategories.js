const PostsCategories = (sequelize) => {
  const postsCategories = sequelize
  .define('PostCategory', { }, { timestamps: false, tableName: 'PostsCategories' });

  postsCategories.associate = (models) => {
    models.Categories.belongsToMany(models.BlogPost, { as: 'post',
      through: postsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Categories,
      { as: 'categories',
      through: postsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };
  return postsCategories;
};

module.exports = PostsCategories;