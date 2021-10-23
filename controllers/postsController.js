const { Blogpost } = require('../models/index');
const postService = require('../services/postsService');

const createPost = async (req, res, next) => {
  const { body } = req;
  const { title, content, categoryIds } = body;
  const token = req.headers.authorization;
  const validate = await postService.createPost(body, token);
  if (validate.message) {
    return next(validate);
  }
  await Blogpost.create({ title, content, categoryIds });
};

module.exports = {
  createPost,
};