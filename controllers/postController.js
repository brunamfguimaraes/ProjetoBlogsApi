const { isValid } = require('../services/postService');
const { BlogPosts, Categories, Users } = require('../models');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const email = req.user;

  const findUser = await Users.findOne({ where: { email } });
  const userId = findUser.dataValues.id;

  const validPost = isValid(title, content, categoryIds);
  if (validPost.error) return res.status(400).json({ message: validPost.message });

  const countCategories = await Categories.count({ where: { id: categoryIds } });
  if (countCategories !== categoryIds.length) { 
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  const { id } = await BlogPosts.create({ title, content, userId });
  return res.status(201).json({ id, title, content, userId });
};

module.exports = { createPost };