const PostCategory = (sequelize, _Datatypes) => {
  const Xablau = sequelize.define('PostsCategory',
    {},
    { timestamps: false, tableName: 'PostsCategories' });

    Xablau.associate = (models) => {
      models.Category.belongsToMany(models.BlogPost, {
        as: 'blogPosts',
        through: Xablau,
        foreignKey: 'categoryId',
        otherKey: 'postId',
      });

      models.BlogPost.belongsToMany(models.Category, {
        as: 'categories',
        through: Xablau,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
    };
  return Xablau;
};

module.exports = PostCategory;
