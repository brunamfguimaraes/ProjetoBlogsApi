const { addPost, getAllPosts } = require('../services/BlogPosts');

const requestCreateBlogPost = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.user;

  const posted = await addPost(title, content, userId);

  return res.status(201).json(posted);
};

const requestBlogPostsList = async (req, res) => {
  const allPosts = await getAllPosts();

  return res.status(200).json(allPosts);
};

module.exports = {
  requestCreateBlogPost,
  requestBlogPostsList,
};
