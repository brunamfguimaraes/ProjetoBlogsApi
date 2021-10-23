const { StatusCodes: {
  BAD_REQUEST, CREATED, OK } } = require('http-status-codes');
const { isValid } = require('../services/post');
const { BlogPosts, Categories, Users } = require('../models');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const email = req.user;

  const findUser = await Users.findOne({ where: { email } });
  const userId = findUser.dataValues.id;

  const validPost = isValid(title, content, categoryIds);
  if (validPost.error) return res.status(BAD_REQUEST).json({ message: validPost.message });

  const countCategories = await Categories.count({ where: { id: categoryIds } });
  if (countCategories !== categoryIds.length) { 
    return res.status(BAD_REQUEST).json({ message: '"categoryIds" not found' });
  }

  const { id } = await BlogPosts.create({ title, content, userId });
  return res.status(CREATED).json({ id, title, content, userId });
};

const getAllPosts = async (req, res) => {
  const posts = await BlogPosts.findAll({
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });
  
  return res.status(OK).json(posts);
};

module.exports = { 
  createPost, getAllPosts,
};
