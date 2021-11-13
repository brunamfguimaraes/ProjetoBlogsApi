 const { BlogPost, User, Category } = require('../models');

  const validatePost = (title, content, categoryIds, res) => {
  if (!title) { return res.status(400).json({ message: '"title" is required' }); }
  if (!content) return res.status(400).json({ message: '"content" is required' });
  if (!categoryIds || categoryIds.length === 0) {
  return res.status(400).json({
      message: '"categoryIds" is required',
    }); 
  }
  return true;
};

 const validateCategories = async (categoryIds, res) => {
  try {
    const categories = await Category.findAll({ where: { id: categoryIds } });
    if (categories.length !== categoryIds.length) {
      return res.status(400).json({ message: '"categoryIds" not found' }); 
}
      return true;
  } catch (error) {
    return res.status(400).json({ message: 'error' });
  }
    };

    const createBlogPost = async (req, res) => {
    try {
      const { title, content, categoryIds } = req.body;
        const email = req.user;
        const { id: userId } = await User.findOne({ where: { email } });      
    
      const validate = validatePost(title, content, categoryIds);
      
      if (!validate) return false;
      const isValidCategories = await (validateCategories(categoryIds));
      
      if (isValidCategories === true);       
      const { id } = await BlogPost.create({ userId, title, content });
      return res.status(201).json({ id, userId, title, content });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  module.exports = { 
    createBlogPost,
  };