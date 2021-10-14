const { BlogPost } = require('../models');

const createBlogPost = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req;
  const newBlogPost = await BlogPost.create({ userId, title, content });

  // const newPostCategory = categoryIds.map((categoryId) =>
  //   PostCategory.create({ postId: [newBlogPost].id, categoryId }));
  
  // Promise.resolve(newPostCategory);

  res.status(201).json(newBlogPost);
};

module.exports = {
  createBlogPost,
};