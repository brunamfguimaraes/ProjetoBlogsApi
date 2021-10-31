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

module.exports = { createPost };
// getAll (findAll)
// getById (findByPk)
// create (create) - OK
// update (update)
// remove (destroy)