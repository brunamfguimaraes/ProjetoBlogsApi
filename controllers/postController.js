const postService = require('../services/postService');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { userId } = req;
 
    const newPost = await postService.createPost(title, content, categoryIds, userId);
    return res.status(201).json(newPost);
  } catch (e) {
    res.status(500).json({ message: 'Não foi possivel criar o post' });
  }
};

module.exports = { createPost };