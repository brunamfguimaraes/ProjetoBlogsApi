const { StatusCodes } = require('http-status-codes');
// https://www.npmjs.com/package/http-status-codes coisa boa viu
const Blogs = require('../services/Blogs');

/* const createPost = async (req, res) => {
    const bodyValue = req.body;
    const userValue = req.user;
    const result = await posts.createPost(bodyValue, userValue);
    if (result.isError) return res.status(result.status).json(result.err);
    return res.status(StatusCodes.CREATED).json(result);
}; */

const getAll = async (req, res) => {
    try {
        const result = await Blogs.getAllPosts();
        if (result.isError) return res.status(result.status).json(result.err);
        return res.status(StatusCodes.OK).json(result);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const postRemove = async (req, res) => {
    try {
     const result = await Blogs.deleteOne(req.params.id, req.user);
     if (result.isError) return res.status(result.status).json(result.err);
     return res.status(204).end();
    } catch (err) {
     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err });
    }
  };

module.exports = {
    getAll,
    postRemove,
};
