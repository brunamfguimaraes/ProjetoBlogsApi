const BlogPosts = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.STRING,
      foreignKey: true,
    },
  }, { 
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
   });
  // https://laraveldaily.com/change-created_at-updated_at-names-fields/

   blogPosts.associate = (models) => {
     blogPosts.belongsTo(models.User, {
       foreignKey: 'userId', as: 'user',
     });
   };
  return blogPosts;
};

module.exports = BlogPosts;