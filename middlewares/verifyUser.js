const { BlogPost } = require('../models');

module.exports = async (req, res, next) => {
  const {
    user: { id: tokenUserId },
    params: { id: paramsId },
  } = req;

  const foundPost = await BlogPost.findOne({ where: { id: paramsId, userId: tokenUserId } });

  if (!foundPost) return res.status(401).json({ message: 'Unauthorized user' });

  next();
};