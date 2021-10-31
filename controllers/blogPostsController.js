const blogpostsServices = require('../services/blogpostsServices');
require('dotenv');

const createPost = async (req, res) => {
  try {
    const newPost = await blogpostsServices.createPost(req.body);
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

module.exports = { createPost };
// getAll (findAll)
// getById (findByPk)
// create (create)
// update (update)
// remove (destroy)