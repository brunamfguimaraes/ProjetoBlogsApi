const Post = require('../services/BlogPost');
const Error = require('../utils/createObjError');

module.exports = async (req, res, next) => {
  const { id: postId } = req.params;
  const { id } = req.user;
  const post = await Post.findByPk(postId);
  if (post.isError) return next(post);
  if (id !== post.user.id) return next(Error.unauthorized('Unauthorized user'));
  next();
};
