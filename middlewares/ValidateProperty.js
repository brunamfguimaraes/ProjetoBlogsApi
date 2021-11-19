const { User, BlogPost } = require('../models');

const HTTP = {
  Unauthorized: 401,
  NotFound: 404,
};

const validateProperty = async (req, res, next) => {
  const { email } = req;
  const { id } = req.params;

  try {
    const post = await BlogPost.findOne({ where: { id } });
    const property = await User.findOne({ where: { id: post.userId } });

    if (property && email === property.email) return next();

    return res.status(HTTP.Unauthorized).json({ message: 'Unauthorized user' });
  } catch (_e) {
    return res.status(HTTP.NotFound).json({ message: 'Post does not exist' });
  }
};

module.exports = validateProperty; 