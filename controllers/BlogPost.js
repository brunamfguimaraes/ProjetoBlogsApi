const {
  addPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../services/BlogPost');

const requestCreateBlogPost = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.user;

  const posted = await addPost(title, content, userId);

  return res.status(201).json(posted);
};

const requestBlogPostsList = async (_req, res) => {
  const allPosts = await getAllPosts();

  console.log(allPosts);

  return res.status(200).json(allPosts);
};

const requestPostById = async (req, res) => {
  const { id } = req.params;

  const postById = await getPostById(id);

  console.log(postById);

  if (!postById) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(postById);
};

const requestUpdatePost = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const updatedBlogPost = await updatePost(id, body);

  if (!updatedBlogPost) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  return res.status(200).json(updatedBlogPost);
};

const requestDeletePost = async (req, res) => {
  const { id } = req.params;

  await deletePost(id);

  return res.status(204).end();
};

module.exports = {
  requestCreateBlogPost,
  requestBlogPostsList,
  requestPostById,
  requestUpdatePost,
  requestDeletePost,
};
