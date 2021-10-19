module.exports = (sequelize, dataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
      title: dataTypes.STRING,
      content: dataTypes.STRING,
      userId: { type: dataTypes.INTEGER, foreignKey: true },
    },
    { 
      timestamps: true,
      createdAt: 'published',
      updatedAt: 'updated',
    });

    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };
  
    return BlogPost;
  };