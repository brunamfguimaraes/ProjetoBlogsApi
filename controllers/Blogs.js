const { StatusCodes } = require('http-status-codes');
// https://www.npmjs.com/package/http-status-codes coisa boa viu
const posts = require('../services/postService');

const createPost = async (req, res) => {
    const bodyValue = req.body;
    const userValue = req.user;
    const result = await posts.createPost(bodyValue, userValue);
    if (result.isError) return res.status(result.status).json(result.err);
    return res.status(StatusCodes.CREATED).json(result);
};

const getAll = async (req, res) => {
    try {
        const result = await posts.getAllPosts();
        if (result.isError) return res.status(result.status).json(result.err);
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

module.exports = {
    getAll,
};