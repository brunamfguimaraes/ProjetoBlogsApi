const rescue = require('express-rescue');
const postService = require('../services/postService');

const creatPost = rescue(async (req, res) => {
  const newPost = req.body;
  // const { userId } = req;
  const post = await postService.creatPost(newPost, 1);
  return res.status(201).json(post);
});

const getPosts = rescue(async (_req, res) => {
  try {
    const result = await postService.getPosts();

    return res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ e: 'Erro ao pegar todos os posts' });
  }
});

const getPostsById = rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const result = await postService.getPostsById(id);

    if (!result) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ e: 'Erro ao pegar post pelo ID' });
  }
});

const updatePost = rescue(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await postService.updatePost(id, title, content);

  res.status(200).json(post);
});

module.exports = {
  creatPost,
  getPosts,
  getPostsById,
  updatePost,
};