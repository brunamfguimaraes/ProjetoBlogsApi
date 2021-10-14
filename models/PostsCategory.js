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
  
      models.Category.belongsToMany(models.Category, {
        as: 'books',
        through: PostsCategory,
        foreignKey: 'user_id',
        otherKey: 'book_id',
      });
    };
  
    return PostsCategory;
  }; 