const { BlogPost, User, Category } = require('../models');

const addNewPost = async (userId, title, content) => {
    const addPost = await BlogPost.create({ userId, title, content });

    return addPost;
};

const getAllPosts = async () => {
    const posts = await BlogPost.findAll({
        include: [{ model: User, as: 'user' }, { model: Category, as: 'categories' }],
    });

    return posts;
};

module.exports = {
    addNewPost,
    getAllPosts,
};
