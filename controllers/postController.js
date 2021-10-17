const postService = require('../services/postService');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;

  const createPost = await postService.create(id, title, content, categoryIds);

  if (createPost.mess) {
    return res.status(400).json({ message: createPost.mess });
  }

  const categories = await postService.findCategory(categoryIds);

  let result = false;
  categories.map((el) => {
    if (!el) {
      result = { mess: '"categoryIds" not found' };
    }

    return result;
  });

  if (result.mess) {
    return res.status(400).json({ message: result.mess });
  }

  return res.status(201).json(createPost);
};

const getAll = async (req, res) => {
  const listAllPosts = await postService.getAll();

  return res.status(200).json(listAllPosts);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const getPost = await postService.getById(id);

  if (getPost.mess) {
    return res.status(404).json({ message: getPost.mess });
  }

  return res.status(200).json(getPost);
};

module.exports = {
  create,
  getAll,
  getById,
};
