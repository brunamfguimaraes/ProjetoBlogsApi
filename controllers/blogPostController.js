const { BlogPost, User, Category } = require('../models');

const createBlogPost = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req;
  const newBlogPost = await BlogPost.create({ userId, title, content });

  // const newPostCategory = categoryIds.map((categoryId) =>
  //   PostCategory.create({ postId: [newBlogPost].id, categoryId }));
  
  // Promise.resolve(newPostCategory);

  res.status(201).json(newBlogPost);
};

const getAllBlogPosts = async (req, res) => {
  const allBlogPosts = await BlogPost.findAll(
    { include: [{ model: User, as: 'user' }, 
    { model: Category, as: 'categories' }] },
);
  return res.status(200).json(allBlogPosts);
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
};