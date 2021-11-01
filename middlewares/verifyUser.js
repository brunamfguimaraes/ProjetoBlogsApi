const { BlogPost } = require('../models');

module.exports = async (req, res, next) => {
  const {
    user: { id: tokenUserId },
    params: { id: paramsId },
  } = req;

  const foundPost = await BlogPost.findOne({ where: { id: paramsId } });

  if (!foundPost) return res.status(404).json({ message: 'Post does not exist' });

  if (foundPost.userId !== tokenUserId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};