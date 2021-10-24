const { User, BlogPost } = require('../models');

const authorPost = async (req, res, next) => {
  const { email } = req;
  const { id } = req.params;
  try {
    const getPost = await BlogPost.findOne({ where: { id } });
    const getUser = await User.findOne({ where: { id: getPost.userId } });
    if (getUser && email === getUser.email) return next();
    return res.status(401).json({ message: 'Unauthorized user' });
  } catch (_e) {
    console.log('Post not found');
    return res.status(404).json({ message: 'Post does not exist' });
  }
};

module.exports = authorPost;