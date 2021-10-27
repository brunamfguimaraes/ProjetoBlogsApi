const {
  addPost,
  getAllPosts,
  getUserId,
  getPostById,
  updatePost,
} = require('../services/BlogPost');

const requestCreateBlogPost = async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user;

  const userId = await getUserId(email);

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
  const { email } = req.user;
  const { body } = req;

  const updatedBlogPost = await updatePost(id, email, body);

  if (!updatedBlogPost) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  return res.status(200).json(updatedBlogPost);
};

module.exports = {
  requestCreateBlogPost,
  requestBlogPostsList,
  requestPostById,
  requestUpdatePost,
};
