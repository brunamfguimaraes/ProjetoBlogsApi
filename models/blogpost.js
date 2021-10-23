const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
   {
     timestamps: false,
     tableName: 'BlogPosts',
   });
   blogPost.associate = (model) => {
     blogPost.belongsTo(model.User, {
       foreignKey: 'userId', as: 'user',
     });
   };
   return blogPost;
};

module.exports = BlogPost;
