const { addPost } = require('../services/BlogPosts');

const requestCreateBlogPost = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.user;

  const posted = await addPost();

  return res.status(200).json(posted);
};

module.exports = {
  requestCreateBlogPost,
};
