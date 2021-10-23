const service = require('../services/blogPost');
const { BlogPost } = require('../../models');

const createPost = async (req, res) => {
  try {
    const { id } = req.user;
    const post = req.body;
    const { title, content, categoryIds } = post;

    const newPost = await service.createPost(id, post);

    if (newPost) {
      return res.status(newPost.status).json({ message: newPost.message });
    }

  const { dataValues } = await BlogPost.create({ title, content, categoryIds });

    return res.status(201).json({ ...dataValues, userId: id });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  createPost,
};
