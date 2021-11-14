 const { BlogPost, User } = require('../models');

const deleteBlogPost = async (req, res) => {
  try {
  const { id } = req.params; 
  const postId = await BlogPost.findByPk(id);
  if (postId.id === null || id === null) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  const email = req.user;
  const userId = await User.findOne({ where: { email } });
 if (postId.id !== userId.id) {
 return res.status(401).json({ message: 'Unauthorized user' }); 
}
  const deletedPost = await BlogPost.destroy({ where: { id } });
  return res.status(204).json({ deletedPost });
  } catch (error) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
};

module.exports = {
  deleteBlogPost,
};