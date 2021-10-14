const postServices = require('../services/postServices');

const verifyTitle = (req, res, next) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: '"title" is required' });
  next();
};

const verifyContent = (req, res, next) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: '"content" is required' });
  next();
};

const verifyCategoryId = async (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds) return res.status(400).json({ message: '"categoryIds" is required' });
  const categoryExists = await postServices.findCategory(categoryIds);
  const existance = categoryExists.some((item) => item !== null);
  if (existance) return res.status(400).json({ message: '"categoryIds" not found' });
  next();
};

const createPost = async (req, res) => {
const { user } = req;
const result = await postServices.createPost(req.body, user);
const { id, title, content, userId } = result;
return res.status(201).json({ id, title, content, userId });
};

const getAll = async (req, res) => {
  const result = await postServices.getAll();
  return res.status(200).json(result);
};

module.exports = {
  createPost,
  verifyTitle,
  verifyContent,
  verifyCategoryId,
  getAll,
};