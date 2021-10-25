module.exports = (sequelize, _DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {}, { timestamps: false });

    PostCategory.associate = (models) => {
        // models.Category.belongsToMany(models.BlogsPost, {
        //     as: 'posts',
        //     through: PostCategory,
        //     foreignKey: 'categoryId',
        //     otherKey: 'postId',
        // });

        // models.BlogsPost.belongsToMany(models.Category, {
        //     as: 'categories',
        //     through: PostCategory,
        //     foreignKey: 'postId',
        //     otherKey: 'categoryId',
        // });
    };

    return PostCategory;
};