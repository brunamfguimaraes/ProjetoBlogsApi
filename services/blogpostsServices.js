const { Blogpost } = require('../models');
const verifyBlogpost = require('../middlewares/validations');

const createBlogpost = async (title, content, categoryIds) => {
  await verifyBlogpost.verifyFieldsBlogpost(title, content, categoryIds);
  const blogpost = await Blogpost.create({ title, content, categoryIds });
  return blogpost;
};

module.exports = { createBlogpost };