const BlogPosts = (sequelize, DataTypes) => {
  const insertBlogPosts = sequelize.define('BlogPost',
    { title: DataTypes.STRING },
    { content: DataTypes.STRING },
    { timestamps: false, tableName: 'BlogPosts' });

  // insertBlogPosts.associate = (models) => {
  //   insertBlogPosts.hasMany(models.Categories,
  //     {
  //       foreignKey 'categoryIds'
  //     })
  // }

  return insertBlogPosts;
};

module.exports = BlogPosts;
