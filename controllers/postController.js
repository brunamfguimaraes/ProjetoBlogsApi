const middlewares = require('../middlewares');
const { 
  registerPost, 
  getAllPosts,
  postById,
  updatedpost,
 } = require('../services/postService');

const createPost = async (req, res, next) => {
  const token = req.headers.authorization;
  const { error } = middlewares.validationPost(req.body);
  if (error) return next(error);

  const newPost = await registerPost(req.body, token);
  if (newPost.message) return res.status(newPost.statusCode).json({ message: newPost.message });

  return res.status(201).json(newPost);
};

const getPosts = async (_req, res) => {
  try {
    const posts = await getAllPosts();
    return res.status(200).json(posts);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: e.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postById(id);
    
    if (post.message) return res.status(post.statusCode).json({ message: post.message });
    
    return res.status(200).json(post);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: e.message });
  }
};

const updatePost = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;
    const existsCategory = await middlewares.verifyCategory(req.body);
    
    if (existsCategory) {
      return res.status(existsCategory.statusCode)
      .json({ message: existsCategory.message }); 
    }

    const { error } = middlewares.validationUpdatePost(req.body);
    if (error) return next(error);

    const newPost = await updatedpost(req.body, id, token);
    if (newPost.message) return res.status(newPost.statusCode).json({ message: newPost.message });

    return res.status(200).json(newPost);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
};