const postService = require('../services/postService');

const createPost = async (req, res) => {
    const { userId } = req;
    const { title, content, categoryIds } = req.body;
    const post = await postService.createPost(title, content, categoryIds, userId);
    return res.status(201).json(post);
};

const getPosts = async (req, res) => {
    const result = await postService.getPosts();

    return res.status(200).json(result);
};

const getPostsById = async (req, res) => {
    const { id } = req.params;
    const result = await postService.getPostsById(id);

    if (!result) {
        return res.status(404).json({ message: 'Post does not exist' });
    }

    return res.status(200).json(result);
};

module.exports = { 
    createPost,
    getPosts,
    getPostsById,
};