const PostCategory = (sequelize, _DataTypes) => {
    const postcategory = sequelize.define('PostCategory', 
    {}, { timestamps: false, tableName: 'PostsCategories' });
    postcategory.associate = (models) => {
      models.BlogPost.belongsToMany(models.Category, { 
        // nome da model
        as: 'categories',
        through: postcategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
      models.Category.belongsToMany(models.BlogPost, { 
        as: 'blogpost',
        through: postcategory,
        foreignKey: 'categoryId',
        otherKey: 'postId',
      });
    };
    return postcategory;
  };
  
  module.exports = PostCategory;

// models/UserBook.js
// module.exports = (sequelize, _DataTypes) => {
//     const UserBook = sequelize.define('UserBook',
//       {},
//       { timestamps: false },
//     );
  
//     UserBook.associate = (models) => {
//       models.Book.belongsToMany(models.User, {
//         as: 'users',
//         through: UserBook,
//         foreignKey: 'book_id',
//         otherKey: 'user_id',
//       });
//       models.User.belongsToMany(models.Book, {
//         as: 'books',
//         through: UserBook,
//         foreignKey: 'user_id',
//         otherKey: 'book_id',
//       });
//     };
  
//     return UserBook;
//   };