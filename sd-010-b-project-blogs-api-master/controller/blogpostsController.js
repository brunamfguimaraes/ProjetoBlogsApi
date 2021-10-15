const { createBlogPostService, getAllPostsService } = require('../service/blogpostsService');

const createBlogPost = async (req, res) => {
  const { body, user } = req;
  console.log(user.userId, 'create blog post');
  try { 
    const blogPost = await createBlogPostService(body, user.userId);
    console.log(blogPost, 'blogspot');
    if (blogPost.message) return res.status(400).json({ message: blogPost.message });
  
    return res.status(201).json(blogPost);
    } catch (err) {
      console.log(err);
    return res.status(500).json(err);
    }
};

const getAllPosts = async (req, res) => {
  try {
    const blogPost = await getAllPostsService();
    return res.status(200).json(blogPost);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = { createBlogPost, getAllPosts };