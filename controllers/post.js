const services = require('../services/post');

async function createPost(req, res) {
  const post = await services.createPost(req.body, req.user);
  return res.status(201).json({
    id: post.id,
    title: post.title,
    content: post.content,
    userId: post.userId,
  });
}

module.exports = {
  createPost,
};