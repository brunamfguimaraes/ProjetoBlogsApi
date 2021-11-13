 const { BlogPost, User, Category } = require('../models');

  const validatePost = (title, content, categoryIds) => {
  if (!title) return { err: { status: 400, message: '"title" is required' } };
  if (!content) return { err: { status: 400, message: '"content" is required' } };
  if (!categoryIds || categoryIds.length === 0) { 
    return { err: { status: 400, message: '"categoryIds" is required' } }; 
}
    return true;
};

 const validateCategories = async (categoryIds) => {
    const categories = await Category.findAll({ where: { id: categoryIds } });
    if (categories.length !== categoryIds.length) {
      return { err: { status: 400, message: '"categoryIds" not found' } }; 
}
      return true;
  }; 

    const createBlogPost = async (req, res) => {
    try {
      const { title, content, categoryIds } = req.body;
        const email = req.user;
        const { id: userId } = await User.findOne({ where: { email } });      
    
      const validate = validatePost(title, content, categoryIds);
      if (validate.err) {
         return res.status(validate.err.status).json({ message: validate.err.message });
         }
      const isValidCategories = await (validateCategories(categoryIds));
      
      if (isValidCategories !== true) { 
        return res.status(isValidCategories.err.status)
        .json({ message: isValidCategories.err.message });
      }       
      const { id } = await BlogPost.create({ userId, title, content });
      return res.status(201).json({ id, userId, title, content });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  module.exports = { 
    createBlogPost,
  };