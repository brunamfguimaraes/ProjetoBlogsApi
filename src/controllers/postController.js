const service = require('../services/postService');
const { code: { HTTP_INTERNAL_SERVER_ERROR } } = require('../schema/index');

const createPost = async (req, res) => {
  try {
    const post = req.body;
    const token = req.headers.authorization;

    const { code, notification } = await service.createPost(post, token);

    return res.status(code).json(notification);
  } catch (e) {
    console.log(e);
    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: 'Internal error' });
  }
};

const getPosts = async (_req, res) => {
  try {
    const { code, notification } = await service.getPosts();

    return res.status(code).json(notification);
  } catch (e) {
    console.log(e);
    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: 'Internal error' });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const { code, notification } = await service.getPostById(id);

    return res.status(code).json(notification);
  } catch (e) {
    console.log(e);
    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: 'Internal error' });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
};
