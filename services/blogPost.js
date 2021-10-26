const { BlogPost, User, Category } = require('../models');

const messagePostNotFound = {
    message: 'Post does not exist',
};

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

const getPostById = async (id) => {
    const post = await BlogPost
    .findOne({
        where: { id },
        include: [{ model: User, as: 'user' }, { model: Category, as: 'categories' }],
    });

    if (!post) {
        return messagePostNotFound;
    }

    return post;
};

module.exports = {
    addNewPost,
    getAllPosts,
    getPostById,
};
