const { User, BlogPost } = require('../models');

const validateOwnership = async (req, res, next) => {
  const { email } = req;
  const { id } = req.params;
  try {
    const post = await BlogPost.findOne({ where: { id } });
    const owner = await User.findOne({ where: { id: post.userId } });
    if (owner && email === owner.email) return next();
    return res.status(401).json({ message: 'Unauthorized user' });
  } catch (_e) {
    console.log('Post not found');
    return res.status(404).json({ message: 'Post does not exist' });
  }
};

module.exports = validateOwnership;