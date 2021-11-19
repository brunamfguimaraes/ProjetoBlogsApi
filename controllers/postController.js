const postService = require('../services/postService');

const creatPost = async (req, res) => {
  // const { id: userId } = req.params;
  const { title, content, categoryIds } = req.body;
  const post = await postService.creatPost(title, content, categoryIds, 1);
  return res.status(201).json(post);
};

const getPosts = async (_req, res) => {
  try {
    const result = await postService.getPosts();

    return res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ e: 'Erro ao pegar todos os posts' });
  }
};

const getPostsById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await postService.getPostsById(id);

    if (!result) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ e: 'Erro ao pegar post pelo ID' });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const result = await postService.updatePost(id, title, content);

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ e: 'Erro ao atualizar post' });
  }
};

module.exports = {
  creatPost,
  getPosts,
  getPostsById,
  updatePost,
};