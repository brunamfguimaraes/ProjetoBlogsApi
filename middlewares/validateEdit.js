const { User, BlogPost } = require('../models');

const HTTP = {
  BadRequest: 400,
  Unauthorized: 401,
};

const validateEdit = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, categoryIds } = req.body;
  const { email } = req;

  const user = await User.findOne({ where: { email } });
  const post = await BlogPost.findOne({ where: { id } });

  if (post.userId !== user.id) {
    return res.status(HTTP.Unauthorized).json({ message: 'Unauthorized user' });
  }

  if (!title) return res.status(HTTP.BadRequest).json({ message: '"title" is required' });

  if (!content) return res.status(HTTP.BadRequest).json({ message: '"content" is required' });

  if (categoryIds) {
    return res.status(HTTP.BadRequest).json({ message: 'Categories cannot be edited' });
  }

  return next();
};

module.exports = validateEdit; 