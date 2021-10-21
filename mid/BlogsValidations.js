const { BlogPosts } = require('../models');

const isOwner = async (postId, userId) => {
    const unauthorized = 'Unauthorized user';
    const inexistent = 'Post does not exist';
    const post = await BlogPosts.findByPk(postId);
    if (post === null) {
        return {
            isError: true,
            err: { message: inexistent },
            status: 404,
        };
    }
    if (post.dataValues.userId !== userId) {
        return { isError: true, err: { message: unauthorized }, status: 401 };
    }
};
module.exports = { isOwner };
