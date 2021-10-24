const blogPostService = require('../services/blogPostsService');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;

  const create = await blogPostService.createPost(id, title, content, categoryIds);
  
  if (create.message) {
    return res.status(400).json({ message: create.message });
  }

  const findIdCategory = await blogPostService.categoryIdExists(categoryIds);

  if (findIdCategory.message) {
    return res.status(400).json({ message: findIdCategory.message });
  }

  return res.status(201).json(create);
};

module.exports = {
  createPost,
};