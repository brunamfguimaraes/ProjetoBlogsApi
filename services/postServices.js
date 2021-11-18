const { BlogPost } = require('../models');

const createPost = async (post) => {
    const result = await BlogPost.create(post);
    return result;
};

module.exports = {
    createPost,
};
