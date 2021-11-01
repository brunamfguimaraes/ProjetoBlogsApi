const { BlogPost } = require('../models');
const { dataNotFound } = require('../helper/errorFunctions');

const { error: { status: postStatus, message: postMessage } } = dataNotFound('Post');

module.exports = async (req, res, next) => {
  const {
    user: { id: tokenUserId },
    params: { id: paramsId },
  } = req;

  const foundPost = await BlogPost.findOne({ where: { id: paramsId } });

  if (!foundPost) return res.status(postStatus).json({ message: postMessage });

  if (foundPost.userId !== tokenUserId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};