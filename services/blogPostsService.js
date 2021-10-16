const { Op } = require('sequelize');
const { BlogPosts, Categories } = require('../models');
const Error = require('../helpers/errors');

const createBlogPost = async (title, content, userId) => {
  const post = await BlogPosts.create({ title, content, userId });
  const { dataValues: { id } } = post;
  return { id, userId, title, content };
};

const checkCategory = async (idCategory) => {
  const category = await Categories.findAll({
     where: { id: { [Op.in]: idCategory } }, 
    });
  if (!category || category.length === 0) {
    return Error.badRequest('"categoryIds" not found');
  } 
  return category;
};

module.exports = {
  createBlogPost,
  checkCategory,
};