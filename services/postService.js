const { Category } = require('../models');
const { BlogPost } = require('../models');
const { User } = require('../models');

const validateTitle = async (req, res, next) => {
  const { title } = req.body;

  if (title === '' || !title) {
    return res.status(400).json({ message: '"title" is required' });
  }
  next();
};

const validateContent = async (req, res, next) => {
  const { content } = req.body;

  if (content === '' || !content) {
    return res.status(400).json({ message: '"content" is required' });
  }
  next();
};

const validateCategoryId = async (req, res, next) => {
  const { categoryIds } = req.body;

  if (!categoryIds || !categoryIds.length) {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }
  next();
};

const validateCategories = async (req, res, next) => {
  const { categoryIds } = req.body;
  const categories = await Category.findAll({ where: { id: categoryIds } });

  if (categoryIds.length !== categories.length) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
};

const createPost = async (title, content, categoryIds, userId) => {
    const post = await BlogPost.create({ title, content, categoryIds, userId });
  
    return post;
};

const getPosts = async () => {
    const result = await BlogPost.findAll({ 
        include: [
            { model: User, as: 'user' },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });

    return result;
};

const getPostsById = async (id) => {
    const result = await BlogPost.findOne({
        where: { id },
        include: [
            { model: User, as: 'user' },
            { model: Category, as: 'categories' },
        ],
    });

    return result;
};

module.exports = {
  validateTitle,
  validateContent,
  validateCategoryId,
  validateCategories,
  createPost,
  getPosts,
  getPostsById,
}; 