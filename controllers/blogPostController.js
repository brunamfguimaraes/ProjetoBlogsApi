const CODE = require('http-status-codes');

const { BlogPost, Category, User } = require('../models');

const createBlogPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user;
    const categories = await Category.findAll({ where: { id: categoryIds } });
  
    if (categories.length !== categoryIds.length) {
    return res.status(CODE.BAD_REQUEST).json({
        message: '"categoryIds" not found',
      });
    }
    
    const blogPost = await BlogPost.create({
      title, content, userId });
      
    return res.status(CODE.CREATED).json(blogPost);
  } catch (error) {
    return res.status(CODE.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } }],
    });
  
    return res.status(CODE.OK).json(blogPosts);
  } catch (error) {
    return res.status(CODE.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const getBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await BlogPost.findOne({
      where: { id }, 
      include: [
        { model: User, as: 'user' }, 
        { model: Category, as: 'categories', through: { attributes: [] } }],
    });

    if (!blogPost) {
 return res.status(CODE.NOT_FOUND).json({
        message: 'Post does not exist' }); 
}
    return res.status(CODE.OK).json(blogPost);
  } catch (error) {
    return res.status(CODE.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
       
    const { title, content } = req.body;
    const blogPost = await BlogPost.findOne({ where: { id },
    include: [
        { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    
    if (!blogPost) { 
      return res.status(CODE.NOT_FOUND).json({
        message: 'Post does not exist' });
      }
    await blogPost.update({ title, content });
    return res.status(CODE.OK).json(blogPost);
  } catch (error) {
    return res.status(CODE.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
};
