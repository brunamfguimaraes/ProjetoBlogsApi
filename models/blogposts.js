// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class BlogPosts extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   BlogPosts.init({
//     title: DataTypes.STRING,
//     content: DataTypes.STRING,
//     userId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'BlogPosts',
//   });
//   return BlogPosts;
// };

const BlogPosts = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false });

  blogPosts.associate = (models) => {
    blogPosts.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return blogPosts;
};

module.exports = BlogPosts;
