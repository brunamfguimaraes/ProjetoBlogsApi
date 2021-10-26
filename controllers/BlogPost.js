const { addPost, getAllPosts, getUserId } = require('../services/BlogPosts');

const requestCreateBlogPost = async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user;

  const userId = await getUserId(email);

  const posted = await addPost(title, content, userId);

  return res.status(201).json(posted);
};

const requestBlogPostsList = async (_req, res) => {
  const allPosts = await getAllPosts();

  return res.status(200).json(allPosts);
};

module.exports = {
  requestCreateBlogPost,
  requestBlogPostsList,
};
