const PostCategory = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory',
  {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: 'PostsCategories',
    underscored: false,
  });

  PostCategory.associate = (models) => {
    PostCategory.hasOne(models.BlogPost,
      { foreignKey: 'id', as: 'postId' });
    PostCategory.hasMany(models.Category,
      { foreignKey: 'id', as: 'categoryId' });
  };

  return postCategory;
};

module.exports = PostCategory; 