require('dotenv');

const jwt = require('jsonwebtoken');
const { BlogPost, PostsCategory, User } = require('../models');

const getTokenData = (token) => {
  const data = jwt.verify(token, process.env.JWT_SECRET);
  return data.email;
};

const findUserByEmail = async (email) => {
  const { id } = await User.findOne({ where: { email } });
  return id;
};

const create = async (title, content, categoryIds, userId) => {
  const published = Date.now();
  const updated = Date.now();
  const categories = categoryIds;
  const { id } = await BlogPost.create({ title, content, userId, published, updated });
  await categories.forEach(async (categoryId) => {
    const postId = id;
    await PostsCategory.create({ categoryId, postId });
  });
  return id;
};

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;

  const email = getTokenData(token);

  const userId = await findUserByEmail(email);
  const id = await create(title, content, categoryIds, userId);

  res.status(201).json({ id, userId, title, content });
};

// const getAllPosts = (req, res)

module.exports = {
  createPost,
};
