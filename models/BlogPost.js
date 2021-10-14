const BlogPost = (sequelize, DataTypes) => {
    const blogPost = sequelize.define('BlogPost', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
    },
    {
        timestamps: false,
        tableName: 'BlogPosts',
    });

    blogPost.associate = (models) => {
        blogPost.belongsToMany(models.User, 
          { foreignKey: 'userId', through: 'PostCategory', as: 'users' });
    };

    return blogPost;
};

module.exports = BlogPost;