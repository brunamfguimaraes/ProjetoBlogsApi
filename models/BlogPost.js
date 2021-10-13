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
        underscored: true,
    });

    blogPost.associate = (models) => {
        blogPost.belongsTo(models.User,
          { foreignKey: 'userId', as: 'users' });
    };

    return blogPost;
};

module.exports = BlogPost;