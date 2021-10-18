const CODE = require('http-status-codes');

const { BlogPost } = require('../models');

const createBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { userId } = req;
        
    const post = await BlogPost.create({
      title,
      content,
      userId,  
    });
    res.status(CODE.CREATED).json(post);
  } catch (error) {
    res.status(CODE.INTERNAL_SERVER_ERROR).json(error);
  }
};

module.exports = {
  createBlogPost,
};
