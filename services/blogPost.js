const { BlogPost, User, Category } = require('../models');

const messagePostNotFound = {
    message: 'Post does not exist',
};

const messageCategoryIdsEdit = {
    message: 'Categories cannot be edited',
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

const updatePost = async (id, title, content, categoriesIds) => {
    if (categoriesIds) {
        return messageCategoryIdsEdit;
    }
    const updatedPost = await BlogPost
        .update({ title, content }, { where: { id } });
    console.log('post atualizado', updatedPost);

    const getPostUpdated = await BlogPost
    .findOne({
        where: { id },
        include: [{ model: Category, as: 'categories' }],
    });

    console.log('O  post depois de atualizado', getPostUpdated);

    return getPostUpdated;
};

module.exports = {
    addNewPost,
    getAllPosts,
    getPostById,
    updatePost,
};
