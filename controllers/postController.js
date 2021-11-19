const service = require('../services/postService');

const createPost = async (req, res) => service.createPost(req.body, req.userInfo)
  .then(({ status, data }) => res.status(status).json(data));

module.exports = { createPost };
