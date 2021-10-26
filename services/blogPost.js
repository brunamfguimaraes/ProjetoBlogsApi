const { BlogPost, User, Category } = require('../models');

const messagePostNotFound = {
    message: 'Post does not exist',
};

// const messageCategoryIdsEdit = {
//     message: 'Categories cannot be edited',
// };

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

const updatePost = async (id, title, content) => {
    // if (categoriesIds) {
    //     return messageCategoryIdsEdit;
    // }
    await BlogPost
        .update({ title, content }, { where: { id } });

    const getPostUpdated = await BlogPost
    .findOne({
        where: { id },
        include: [{ model: Category,
            as: 'categories',
            through: { attributes: [] } }],
        attributes: { exclude: ['id', 'published', 'updated'] },
    });

    return getPostUpdated;
};

const deletePost = async (id) => {
    // const getPost = await BlogPost
    // .findOne({
    //     where: { id },
    // });
    // console.log('peguei o post antes de deletar', getPost);
    // if (!getPost) {
    //     return messagePostNotFound;
    // }
    const deletedPost = await BlogPost.destroy({ where: { id } });
    console.log(deletedPost);

    return deletedPost;
};

module.exports = {
    addNewPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
};
