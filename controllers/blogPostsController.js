const blogpostsServices = require('../services/blogpostsServices');
require('dotenv');

const createPost = async (req, res) => {
  try {
    const { user } = req;
    const postData = { ...req.body, userId: user.id };
    const newPost = await blogpostsServices.createPost(postData);
    if (newPost.error) {
      const { status, message } = newPost.error;
      return res.status(status).json({ message });
    }
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went Wrong. Please Try again');
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await blogpostsServices.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong. Please try again');
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await blogpostsServices.getPostById(id);
    if (post.error) {
      const { status, message } = post.error;
      return res.status(status).json({ message });
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong. Please try again');
  }
};

module.exports = { 
  createPost,
  getAllPosts,
  getPostById, 
};
// getAll (findAll) - OK
// getById (findOne) - OK
// create (create) - OK
// update (update)
// remove (destroy)