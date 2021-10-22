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

const postRemove = async (req, res) => {
    try {
        const result = await Post.deleteOne(req.params.id, req.user);
        if (result.isError) return res.status(result.status).json(result.err);
        return res.status(204).end();
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err });
    }
};

const findPost = async (req, res) => {
    try {
      const result = await Post.findPost(req.query.q);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  };

module.exports = {
    getAll,
    postRemove,
    findPost,
};