const { BlogPost } = require('../models');

const { Category } = require('../models');

const createPost = async (post, id) => {
    const postIn = {
        title: post.title,
        content: post.content,
        userId: id,
    };
    const result = await BlogPost.create(postIn);
    return result;
};

const findCategory = async (ids) => {
    const result = await ids.map((id) => Category.findOne({ where: { id } }));
    return Promise.all(result).then((values) => values);
};

module.exports = {
    createPost,
    findCategory,
};
