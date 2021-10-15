require('dotenv');

const jwt = require('jsonwebtoken');
const { BlogPost } = require('../models');

const getTokenData = (token) => {
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  return id;
};

const createPost = async (req, res) => {
  const user = getTokenData(req.headers.authorization);
  
  const newPost = await BlogPost.create(
    { title: req.body.title, content: req.body.content, userId: user },
  );
  const { id, title, content, userId } = newPost;
  
  return res.status(201).json({ id, userId, title, content });
};

module.exports = {
  createPost,
};
