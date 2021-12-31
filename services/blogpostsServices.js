const { BlogPost, User, Category } = require('../models');
const verifyBlogpost = require('../middlewares/validations');

const createBlogpost = async (title, content, categoryIds, userId) => {
  await verifyBlogpost.verifyFieldsBlogpost(title, content, categoryIds);
    const blogpost = await BlogPost.create({ title, content, userId });
    console.log(blogpost);
    return blogpost;
};

const getAllPosts = async () => {
  const post = await BlogPost.findAll(
    {
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
  },
  );
  return post;
};

module.exports = { createBlogpost, getAllPosts };