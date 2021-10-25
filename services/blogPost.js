const { BlogPost, User } = require('../models');

const addNewPost = async (userId, title, content) => {
    const addPost = await BlogPost.create({ userId, title, content });
    console.log(addPost);

    return addPost;
};

const getAllPosts = async () => {
    const posts = await BlogPost.findAll({
        include: [{ model: User, as: 'user' }],
    });

    return posts;
};

module.exports = {
    addNewPost,
    getAllPosts,
};
