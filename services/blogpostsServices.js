const { Blogpost } = require('../models');
const verifyBlogpost = require('../middlewares/validations');

const createBlogpost = async (title, content, categoryId) => {
  await verifyBlogpost.verifyFieldsBlogpost(title, content, categoryId);
  const blogpost = await Blogpost.create({ title, content, categoryId });
  return blogpost;
};

module.exports = { createBlogpost };