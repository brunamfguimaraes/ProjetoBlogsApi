const { StatusCodes } = require('http-status-codes');
// https://www.npmjs.com/package/http-status-codes coisa boa viu
const Post = require('../services/Post');

/* const createPost = async (req, res) => {
    const bodyValue = req.body;
    const userValue = req.user;
    const result = await posts.createPost(bodyValue, userValue);
    if (result.isError) return res.status(result.status).json(result.err);
    return res.status(StatusCodes.CREATED).json(result);
}; */

const getAll = async (req, res) => {
    try {
        const result = await Post.getAllPosts();
        if (result.isError) return res.status(result.status).json(result.err);
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const newPost = async (req, res) => {
    try {
        const data = req.body;
        const userData = req.user;
        const response = await Post.newPost(data, userData);
        if (response.isError) return res.status(response.status).json(response.err);
        return res.status(StatusCodes.CREATED).json(response);
    } catch (err) {
        // console.log(err)
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    newPost,
};