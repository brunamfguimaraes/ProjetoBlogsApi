module.exports = (sequelize, dataTypes) => {
    const blogPost = sequelize.define('BlogPost', {
      title: dataTypes.STRING,
      content: dataTypes.STRING,
      userId: { type: dataTypes.INTEGER, foreignKey: true },
    },
    { 
      timestamps: true,
      createdAt: 'published',
      updatedAt: 'updated',
    });

    blogPost.associate = (models) => {
        blogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
    };
  
    return blogPost;
  };