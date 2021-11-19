const rescue = require('express-rescue');
const postService = require('../services/postService');

const insertPost = rescue(async (request, response) => {
  const newPost = request.body;
//   const { id: userId } = request;
  const post = await postService.insertPost(newPost, 1);
  return response.status(201).json(post);
});

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
    insertPost,
    getPosts,
    getPostsById,
};