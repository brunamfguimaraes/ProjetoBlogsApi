// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class PostsCategories extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   PostsCategories.init({
//     postId: DataTypes.INTEGER,
//     categoryId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'PostsCategories',
//   });
//   return PostsCategories;
// };

const PostsCategories = (sequelize, _DataTypes) => {
  const postsCategories = sequelize.define('PostsCategories', {}, { timestamps: false });

  postsCategories.associate = (models) => {
    models.Category.belongsToMany(models.BlogPosts, {
      as: 'blogPosts',
      through: postsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });

    models.BlogPosts.belongsToMany(models.Category, {
      as: 'categories',
      through: postsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return postsCategories;
};

module.exports = PostsCategories;
