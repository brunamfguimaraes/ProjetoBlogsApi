const createBlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPosts',
  {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    password: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
  });

  BlogPost.associate = (_models) => {
    BlogPost.belongsTo('User', 
    {
      foreignKey: 'id',
      as: 'userId',
    });
  };
  return BlogPost;
};

module.exports = createBlogPost;