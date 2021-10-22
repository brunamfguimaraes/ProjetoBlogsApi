const { createPost, findAllPosts } = require('../services/blogPost');
const { findAllCategories } = require('../services/category');
const { getUserByEmail } = require('../services/user');

const status400 = 400;
const status201 = 201;
const status200 = 200;

const postBlogPost = async (req, res) => {
  console.log(req.token);
  const { email } = req.token;
  const { title, content, categoryIds } = req.body;
  const allCategories = await findAllCategories();
  const allIds = allCategories.map((category) => category.id);
  const idsExist = categoryIds.every((id) => allIds.includes(id));
  if (!idsExist) {
    return res.status(status400).json({ message: '"categoryIds" not found' });
  }
  const { id: userId } = await getUserByEmail(email);
  const result = await createPost({ title, content, categoryIds, userId });
  return res.status(status201).json(result);
};

const getAllPosts = async (req, res) => {
  const result = await findAllPosts();
  return res.status(status200).json(result);
};

module.exports = {
  postBlogPost,
  getAllPosts,
};