const { BlogPost } = require('../models');
const verifyBlogpost = require('../middlewares/validations');

const createBlogpost = async (title, content, categoryIds, userId) => {
  await verifyBlogpost.verifyFieldsBlogpost(title, content, categoryIds);
    const blogpost = await BlogPost.create({ title, content, userId });
    console.log(blogpost);
    return blogpost;
};

module.exports = { createBlogpost };